import { ethereum, BigInt, BigDecimal, log, Bytes, Address } from '@graphprotocol/graph-ts';
import {
    Burn,
    Factory,
    Mint,
    Pool,
    Swap,
    Token,
    AddLimitOrder,
    DecLimitOrder,
    Flash,
} from '../generated/schema';
import {
    Burn as BurnEvent,
    Flash as FlashEvent,
    Mint as MintEvent,
    Swap as SwapEvent,
    AddLimitOrder as AddLimitOrderEvent,
    DecLimitOrder as DecLimitOrderEvent,
} from '../generated/templates/Pool/Pool';
import { FACTORY_ADDRESS, StableCoinConfig } from './config';
import { ONE_BD, ONE_BI, ZERO_BD } from './constants';
import { updatePoolDayData, updatePoolHourData, updateTokenDayData, updateTokenHourData } from './intervalUpdater';
import { bigEndianBytesToBigInt, convertFeeNumber, convertTokenToDecimal, tick2PriceDecimal, topicToAddress } from './utils/funcs';
import { findUsdPerToken } from './utils/pricing';
import { ERC20TransferTopic, fetchTokenBalanceAmount } from './utils/tokenHelper';
import { getOrCreateTransaction } from './utils/contractHelper'

function updateTVL(
    pool: Pool,
    tokenX: Token,
    amountXDelta: BigDecimal,
    tokenY: Token,
    amountYDelta: BigDecimal,
    factory: Factory
): void {
    factory.tvlUSD = factory.tvlUSD.minus(pool.tvlUSD);

    if (amountXDelta.notEqual(ZERO_BD)) {
        // read from contract too low
        // const tvlX = fetchTokenBalanceAmount(pool.tokenX, pool.id, tokenX.decimals);
        pool.tvlTokenX = pool.tvlTokenX.plus(amountXDelta);
        tokenX.tvl = tokenX.tvl.plus(amountXDelta);
        tokenX.tvlUSD = tokenX.tvl.times(tokenX.priceUSD);
        // tokenX.save()
    }

    if (amountYDelta.notEqual(ZERO_BD)) {
        // const tvlY = fetchTokenBalanceAmount(pool.tokenY, pool.id, tokenY.decimals);
        pool.tvlTokenY = pool.tvlTokenY.plus(amountYDelta);
        tokenY.tvl = tokenY.tvl.plus(amountYDelta);
        tokenY.tvlUSD = tokenY.tvl.times(tokenY.priceUSD);
        // tokenY.save()
    }

    pool.tvlUSD = pool.tvlTokenX.times(tokenX.priceUSD).plus(pool.tvlTokenY.times(tokenY.priceUSD));

    factory.tvlUSD = factory.tvlUSD.plus(pool.tvlUSD);

    // pool.save()
    // factory.save()
}

export function handleMint(event: MintEvent): void {
    const pool = Pool.load(event.address.toHexString()) as Pool;
    if (pool === null) {
        return;
    }

    const factory = Factory.load(FACTORY_ADDRESS) as Factory;

    const tokenX = Token.load(pool.tokenX) as Token;
    const tokenY = Token.load(pool.tokenY) as Token;
    const amountX = convertTokenToDecimal(event.params.amountX, tokenX.decimals);
    const amountY = convertTokenToDecimal(event.params.amountY, tokenY.decimals);

    const amountUSD = amountX.times(tokenX.priceUSD).plus(amountY.times(tokenY.priceUSD));

    // tx count
    factory.txCount = factory.txCount.plus(ONE_BI);
    tokenX.txCount = tokenX.txCount.plus(ONE_BI);
    tokenY.txCount = tokenY.txCount.plus(ONE_BI);
    pool.txCount = pool.txCount.plus(ONE_BI);

    // TODO abs amount read from token?
    updateTVL(pool, tokenX, amountX, tokenY, amountY, factory);

    pool.liquidity = pool.liquidity.plus(event.params.liquidity);

    // mint entity
    const transaction = getOrCreateTransaction(event);
    const mint = new Mint(transaction.id.toString() + '#' + pool.txCount.toString());
    mint.transaction = transaction.id;
    mint.timestamp = transaction.timestamp;
    mint.pool = pool.id;
    mint.tokenX = pool.tokenX;
    mint.tokenY = pool.tokenY;
    mint.owner = event.params.owner;
    mint.sender = event.params.sender;
    mint.account = event.transaction.from;
    mint.withContract = event.transaction.to;

    mint.liquidity = event.params.liquidity;
    mint.amountX = amountX;
    mint.amountY = amountY;
    mint.amountUSD = amountUSD;
    mint.leftPoint = BigInt.fromI32(event.params.leftPoint);
    mint.rightPoint = BigInt.fromI32(event.params.rightPoint);
    mint.logIndex = event.logIndex;

    const poolDayData = updatePoolDayData(event);
    // updatePoolHourData(event);
    const tokenXDayData = updateTokenDayData(tokenX, event);
    const tokenYDayData = updateTokenDayData(tokenY, event);
    // updateTokenHourData(tokenX, event);
    // updateTokenHourData(tokenY, event);

    // save
    factory.save();
    pool.save();
    tokenX.save();
    tokenY.save();
    mint.save();
    poolDayData.save();
    tokenXDayData.save();
    tokenYDayData.save();
}

function getBurnId(event: BurnEvent, poolId: string): string {
    return (
        event.transaction.hash.toHexString() +
        '#' +
        poolId +
        '#' +
        event.params.leftPoint.toString() +
        '#' +
        event.params.rightPoint.toString() +
        '#' +
        event.params.liquidity.toString()
    );
}

export function handleBurn(event: BurnEvent): void {
    const pool = Pool.load(event.address.toHexString()) as Pool;
    if (pool === null) {
        return;
    }

    // TODO, emit Burn twice
    const burnId = getBurnId(event, pool.id);
    const preBurn = Burn.load(burnId);
    if (preBurn != null) {
        return;
    }

    const factory = Factory.load(FACTORY_ADDRESS) as Factory;

    const tokenX = Token.load(pool.tokenX) as Token;
    const tokenY = Token.load(pool.tokenY) as Token;
    const amountX = convertTokenToDecimal(event.params.amountX, tokenX.decimals);
    const amountY = convertTokenToDecimal(event.params.amountY, tokenY.decimals);

    const amountUSD = amountX.times(tokenX.priceUSD).plus(amountY.times(tokenY.priceUSD));

    // tx count
    factory.txCount = factory.txCount.plus(ONE_BI);
    tokenX.txCount = tokenX.txCount.plus(ONE_BI);
    tokenY.txCount = tokenY.txCount.plus(ONE_BI);
    pool.txCount = pool.txCount.plus(ONE_BI);

    let collectedFeesTokenX = ZERO_BD;
    let collectedFeesTokenY = ZERO_BD;
    // get actual token with erc20 transfer event
    if (event.receipt != null && (amountX != ZERO_BD || amountY != ZERO_BD)) {
        const eventLogs = event.receipt!.logs;
        for (let index = 0; index < eventLogs.length; index++) {
            const eventLog = eventLogs[index];
            if (eventLog.topics[0].toHexString() != ERC20TransferTopic) {
                continue;
            }
            const tokenAddr = eventLog.address.toHexString();
            const fromAddr = topicToAddress(eventLog.topics[1]);
            if (fromAddr == pool.id && tokenAddr == tokenX.id) {
                collectedFeesTokenX = convertTokenToDecimal(
                    bigEndianBytesToBigInt(eventLog.data),
                    tokenX.decimals
                ).minus(amountX);
            }
            if (fromAddr == pool.id && tokenAddr == tokenY.id) {
                collectedFeesTokenY = convertTokenToDecimal(
                    bigEndianBytesToBigInt(eventLog.data),
                    tokenY.decimals
                ).minus(amountY);
            }
        }
    }

    // burn with fee collect
    // TODO better way
    updateTVL(
        pool,
        tokenX,
        amountX.plus(collectedFeesTokenX).neg(),
        tokenY,
        amountY.plus(collectedFeesTokenY).neg(),
        factory
    );

    pool.liquidity = pool.liquidity.minus(event.params.liquidity);
    pool.collectedFeesTokenX = pool.collectedFeesTokenX.plus(collectedFeesTokenX);
    pool.collectedFeesTokenY = pool.collectedFeesTokenY.plus(collectedFeesTokenY);
    pool.collectedFeesUSD = pool.collectedFeesUSD.plus(
        collectedFeesTokenX.times(tokenX.priceUSD).plus(collectedFeesTokenY.times(tokenY.priceUSD))
    );

    // burn entity
    const transaction = getOrCreateTransaction(event);
    const burn = new Burn(burnId);
    burn.transaction = transaction.id;
    burn.timestamp = transaction.timestamp;
    burn.pool = pool.id;
    burn.tokenX = pool.tokenX;
    burn.tokenY = pool.tokenY;
    burn.owner = event.params.owner;
    burn.account = event.transaction.from;
    burn.withContract = event.transaction.to;

    burn.liquidity = event.params.liquidity;
    burn.amountX = amountX;
    burn.amountY = amountY;
    burn.amountUSD = amountUSD;
    burn.leftPoint = BigInt.fromI32(event.params.leftPoint);
    burn.rightPoint = BigInt.fromI32(event.params.rightPoint);

    burn.collectedFeesTokenX = collectedFeesTokenX;
    burn.collectedFeesTokenY = collectedFeesTokenY;
    burn.logIndex = event.logIndex;

    const poolDayData = updatePoolDayData(event);
    // updatePoolHourData(event);
    const tokenXDayData = updateTokenDayData(tokenX, event);
    const tokenYDayData = updateTokenDayData(tokenY, event);
    // updateTokenHourData(tokenX, event);
    // updateTokenHourData(tokenY, event);

    // save
    factory.save();
    pool.save();
    tokenX.save();
    tokenY.save();
    burn.save();
    poolDayData.save();
    tokenXDayData.save();
    tokenYDayData.save();
}

export function handleSwap(event: SwapEvent): void {
    const pool = Pool.load(event.address.toHexString()) as Pool;
    if (pool === null) {
        return;
    }

    const factory = Factory.load(FACTORY_ADDRESS) as Factory;

    const tokenX = Token.load(pool.tokenX) as Token;
    const tokenY = Token.load(pool.tokenY) as Token;
    const amountX = convertTokenToDecimal(event.params.amountX, tokenX.decimals);
    const amountY = convertTokenToDecimal(event.params.amountY, tokenY.decimals);

    const sellXEarnY = event.params.sellXEarnY;

    const amountXDelta = sellXEarnY ? amountX : amountX.neg();
    const amountYDelta = sellXEarnY ? amountY.neg() : amountY;

    // tx count
    factory.txCount = factory.txCount.plus(ONE_BI);
    pool.txCount = pool.txCount.plus(ONE_BI);
    tokenX.txCount = tokenX.txCount.plus(ONE_BI);
    tokenY.txCount = tokenY.txCount.plus(ONE_BI);

    // updated pool rates
    pool.tokenXPrice = ONE_BD.div(tick2PriceDecimal(event.params.currentPoint, tokenX.decimals, tokenY.decimals));
    pool.tokenYPrice = tick2PriceDecimal(event.params.currentPoint, tokenX.decimals, tokenY.decimals);

    // volume and fee
    let amountUSD = ZERO_BD;
    let feesUSD = ZERO_BD;
    const feeRate = convertFeeNumber(pool.feeTier);
    let volumeTokenX = ZERO_BD;
    let volumeTokenY = ZERO_BD;
    let feesTokenX = ZERO_BD;
    let feesTokenY = ZERO_BD;
    if (sellXEarnY) {
        feesTokenX = amountX.times(feeRate);
        amountUSD = amountX.times(tokenX.priceUSD);
        feesUSD = feesTokenX.times(tokenX.priceUSD);
        volumeTokenX = amountX;

        tokenX.volume = tokenX.volume.plus(amountX);
        tokenX.volumeUSD = tokenX.volumeUSD.plus(amountUSD);
        tokenX.fees = tokenX.fees.plus(feesTokenX);
        tokenX.feesUSD = tokenX.feesUSD.plus(feesUSD);
        pool.feesTokenX = pool.feesTokenX.plus(feesTokenX);
        pool.volumeTokenX = pool.volumeTokenX.plus(amountX);
    } else {
        feesTokenY = amountY.times(feeRate);
        amountUSD = amountY.times(tokenY.priceUSD);
        feesUSD = feesTokenY.times(tokenY.priceUSD);
        volumeTokenY = amountY;

        tokenY.volume = tokenY.volume.plus(amountY);
        tokenY.volumeUSD = tokenY.volume.plus(amountUSD);
        tokenY.feesUSD = tokenY.feesUSD.plus(feesUSD);
        tokenY.fees = tokenY.fees.plus(feesTokenY);
        pool.feesTokenY = pool.feesTokenY.plus(feesTokenY);
        pool.volumeTokenY = pool.volumeTokenY.plus(amountY);
    }

    if (amountUSD==ZERO_BD){
        if (StableCoinConfig.config().has(tokenX.id)) {
            amountUSD = amountX;
        }
        if (StableCoinConfig.config().has(tokenY.id)){
            amountUSD = amountY
        }
    }

    factory.totalVolumeUSD = factory.totalVolumeUSD.plus(amountUSD);
    factory.totalFeesUSD = factory.totalFeesUSD.plus(feesUSD);
    pool.volumeUSD = pool.volumeUSD.plus(amountUSD);
    pool.feesUSD = pool.feesUSD.plus(feesUSD);

    // TVL
    updateTVL(pool, tokenX, amountXDelta, tokenY, amountYDelta, factory);

    // create Swap event
    const transaction = getOrCreateTransaction(event);
    const swap = new Swap(transaction.id + '#' + pool.txCount.toString());
    swap.transaction = transaction.id;
    swap.timestamp = transaction.timestamp;
    swap.pool = pool.id;
    swap.tokenX = pool.tokenX;
    swap.tokenY = pool.tokenY;
    swap.account = event.transaction.from;
    swap.withContract = event.transaction.to;

    swap.amountX = amountX;
    swap.amountY = amountY;
    swap.sellXEarnY = event.params.sellXEarnY;
    swap.amountUSD = amountUSD;
    swap.logIndex = event.logIndex;

    // interval process
    const poolDayData = updatePoolDayData(event);
    // const poolHourData = updatePoolHourData(event);
    const tokenXDayData = updateTokenDayData(tokenX, event);
    const tokenYDayData = updateTokenDayData(tokenY, event);
    // const tokenXHourData = updateTokenHourData(tokenX, event);
    // const tokenYHourData = updateTokenHourData(tokenY, event);

    poolDayData.volumeTokenX = poolDayData.volumeTokenX.plus(volumeTokenX);
    poolDayData.volumeTokenY = poolDayData.volumeTokenY.plus(volumeTokenY);
    poolDayData.feesTokenX = poolDayData.feesTokenX.plus(feesTokenX);
    poolDayData.feesTokenY = poolDayData.feesTokenY.plus(feesTokenY);
    poolDayData.feesUSD = poolDayData.feesUSD.plus(feesUSD);
    poolDayData.volumeUSD = poolDayData.volumeUSD.plus(amountUSD);

    // poolHourData.volumeTokenX = poolHourData.volumeTokenX.plus(volumeTokenX);
    // poolHourData.volumeTokenY = poolHourData.volumeTokenY.plus(volumeTokenY);
    // poolHourData.feesTokenX = poolHourData.feesTokenX.plus(feesTokenX);
    // poolHourData.feesTokenY = poolHourData.feesTokenY.plus(feesTokenY);
    // poolHourData.feesUSD = poolHourData.feesUSD.plus(feesUSD);
    // poolHourData.volumeUSD = poolHourData.volumeUSD.plus(amountUSD);

    tokenXDayData.volume = tokenXDayData.volume.plus(volumeTokenX);
    tokenXDayData.fees = tokenXDayData.fees.plus(feesTokenX);
    tokenXDayData.feesUSD = tokenXDayData.feesUSD.plus(sellXEarnY ? feesUSD : ZERO_BD);
    tokenXDayData.volumeUSD = tokenXDayData.volumeUSD.plus(sellXEarnY ? amountUSD : ZERO_BD);

    tokenYDayData.volume = tokenYDayData.volume.plus(volumeTokenY);
    tokenYDayData.fees = tokenYDayData.fees.plus(feesTokenY);
    tokenYDayData.feesUSD = tokenYDayData.feesUSD.plus(sellXEarnY ? ZERO_BD : feesUSD);
    tokenYDayData.volumeUSD = tokenYDayData.volumeUSD.plus(sellXEarnY ? ZERO_BD : amountUSD);

    // tokenXHourData.volume = tokenXHourData.volume.plus(volumeTokenX);
    // tokenXHourData.fees = tokenXHourData.fees.plus(feesTokenX);
    // tokenXHourData.feesUSD = tokenXHourData.feesUSD.plus(sellXEarnY ? feesUSD : ZERO_BD);
    // tokenXHourData.volumeUSD = tokenXHourData.volumeUSD.plus(sellXEarnY ? amountUSD : ZERO_BD);

    // tokenYHourData.volume = tokenYHourData.volume.plus(volumeTokenY);
    // tokenYHourData.fees = tokenYHourData.fees.plus(feesTokenY);
    // tokenYHourData.feesUSD = tokenYHourData.feesUSD.plus(sellXEarnY ? ZERO_BD : feesUSD);
    // tokenYHourData.volumeUSD = tokenYHourData.volumeUSD.plus(sellXEarnY ? ZERO_BD : amountUSD);

    // save
    factory.save();
    pool.save();

    tokenX.priceUSD = findUsdPerToken(tokenX);
    tokenY.priceUSD = findUsdPerToken(tokenY);
    tokenX.save();
    tokenY.save();

    swap.save();

    poolDayData.save();
    // poolHourData.save();
    tokenXDayData.save();
    tokenYDayData.save();
    // tokenXHourData.save();
    // tokenYHourData.save();
}

function getAddLimitOrderId(event: AddLimitOrderEvent, poolId: string): string {
    return (
        event.transaction.hash.toHexString() +
        '#' +
        poolId +
        '#' +
        event.params.point.toString() +
        '#' +
        event.params.sellXEarnY.toString()
    );
}

function getDecLimitOrderId(event: DecLimitOrderEvent, poolId: string): string {
    return (
        event.transaction.hash.toHexString() +
        '#' +
        poolId +
        '#' +
        event.params.point.toString() +
        '#' +
        event.params.sellXEarnY.toString()
    );
}

function summaryTxTokenTransferAmount(eventLogs: Array<ethereum.Log>, account: string, token: Token): BigDecimal {
    let amount = ZERO_BD;
    for (let index = 0; index < eventLogs.length; index++) {
        const eventLog = eventLogs[index];
        if (eventLog.topics[0].toHexString() != ERC20TransferTopic) {
            continue;
        }
        const tokenAddr = eventLog.address.toHexString();
        const fromAddr = topicToAddress(eventLog.topics[1]);
        const toAddr = topicToAddress(eventLog.topics[2]);
        if (fromAddr == account && tokenAddr == token.id) {
            amount = amount.minus(convertTokenToDecimal(bigEndianBytesToBigInt(eventLog.data), token.decimals));
        }
        if (toAddr == account && tokenAddr == token.id) {
            amount = amount.plus(convertTokenToDecimal(bigEndianBytesToBigInt(eventLog.data), token.decimals));
        }
    }
    return amount;
}

// export function handleAddLimitOrder(event: AddLimitOrderEvent): void {
//     const pool = Pool.load(event.address.toHexString()) as Pool;
//     if (pool === null) {
//         return;
//     }

//     // TODO, contract bug, emit AddLimitOrder thrice, tmp filter
//     const addLimitOrderId = getAddLimitOrderId(event, pool.id);
//     const preAddLimitOrder = AddLimitOrder.load(addLimitOrderId);
//     if (preAddLimitOrder != null) {
//         return;
//     }

//     const factory = Factory.load(FACTORY_ADDRESS) as Factory;

//     const tokenX = Token.load(pool.tokenX) as Token;
//     const tokenY = Token.load(pool.tokenY) as Token;

//     // TODO, contract bug, amount may be zero, event.params.sellXEarnY may be wrong
//     let token = event.params.sellXEarnY ? tokenX : tokenY;
//     // let amount = convertTokenToDecimal(event.params.amount, token.decimals);
//     let amount = ZERO_BD;
//     let amountX = ZERO_BD;
//     let amountY = ZERO_BD;

//     // TODO, tx count ?
//     pool.txCount = pool.txCount.plus(ONE_BI);
//     factory.txCount = factory.txCount.plus(ONE_BI);

//     // get actual token with erc20 transfer event
//     if (event.receipt != null) {
//         const eventLogs = event.receipt!.logs;
//         amountX = summaryTxTokenTransferAmount(eventLogs, pool.id, tokenX);
//         amountY = summaryTxTokenTransferAmount(eventLogs, pool.id, tokenY);

//         amount = amountX == ZERO_BD ? amountY : amountX;
//         token = amountX == ZERO_BD ? tokenY : tokenX;
//     }

//     const amountUSD = amount.times(token.priceUSD);
//     const orderPrice = tick2PriceDecimal(event.params.point, tokenX.decimals, tokenY.decimals);

//     updateTVL(pool, tokenX, amountX, tokenY, amountY, factory);

//     // TODO, contract bug, force to update tvl
//     const tvlX = fetchTokenBalanceAmount(pool.tokenX, pool.id, tokenX.decimals);
//     const tvlY = fetchTokenBalanceAmount(pool.tokenY, pool.id, tokenY.decimals);
//     pool.tvlTokenX = tvlX;
//     pool.tvlTokenY = tvlY;
//     pool.tvlUSD = pool.tvlTokenX.times(tokenX.priceUSD).plus(pool.tvlTokenY.times(tokenY.priceUSD));

//     // TODO, tx count ?
//     pool.txCount = pool.txCount.plus(ONE_BI);
//     factory.txCount = factory.txCount.plus(ONE_BI);

//     const transaction = getOrCreateTransaction(event);
//     const addLimitOrder = new AddLimitOrder(addLimitOrderId);
//     addLimitOrder.transaction = transaction.id;
//     addLimitOrder.timestamp = transaction.timestamp;
//     addLimitOrder.pool = pool.id;
//     addLimitOrder.tokenX = pool.tokenX;
//     addLimitOrder.tokenY = pool.tokenY;
//     addLimitOrder.account = event.transaction.from;
//     addLimitOrder.withContract = event.transaction.to;

//     addLimitOrder.amount = amount;
//     addLimitOrder.point = BigInt.fromI32(event.params.point);
//     addLimitOrder.sellXEarnY = event.params.sellXEarnY;

//     addLimitOrder.amountUSD = amountUSD;
//     addLimitOrder.price = orderPrice;

//     addLimitOrder.logIndex = event.logIndex;

//     addLimitOrder.amountX = amountX;
//     addLimitOrder.amountY = amountY;

//     factory.save();
//     pool.save();
//     token.save();
//     addLimitOrder.save();
// }

// export function handleDecLimitOrder(event: DecLimitOrderEvent): void {
//     const pool = Pool.load(event.address.toHexString()) as Pool;
//     if (pool === null) {
//         return;
//     }

//     // emit DecLimitOrder thrice, tmp filter
//     const decLimitOrderId = getDecLimitOrderId(event, pool.id);
//     const preDecLimitOrder = DecLimitOrder.load(decLimitOrderId);
//     if (preDecLimitOrder != null) {
//         return;
//     }

//     const factory = Factory.load(FACTORY_ADDRESS) as Factory;

//     const tokenX = Token.load(pool.tokenX) as Token;
//     const tokenY = Token.load(pool.tokenY) as Token;

//     // TODO, contract bug, amount may be zero, event.params.sellXEarnY may be wrong
//     let token = event.params.sellXEarnY ? tokenX : tokenY;
//     // let amount = convertTokenToDecimal(event.params.amount, token.decimals);
//     let amount = ZERO_BD;
//     let amountX = ZERO_BD;
//     let amountY = ZERO_BD;

//     // get actual token with erc20 transfer event
//     if (event.receipt != null) {
//         const eventLogs = event.receipt!.logs;
//         amountX = summaryTxTokenTransferAmount(eventLogs, pool.id, tokenX);
//         amountY = summaryTxTokenTransferAmount(eventLogs, pool.id, tokenY);

//         amount = amountX == ZERO_BD ? amountY : amountX;
//         token = amountX == ZERO_BD ? tokenY : tokenX;
//     }

//     const amountUSD = amount.times(token.priceUSD);
//     const orderPrice = tick2PriceDecimal(event.params.point, tokenX.decimals, tokenY.decimals);

//     updateTVL(pool, tokenX, amountX, tokenY, amountY, factory);

//     // TODO, contract bug, force to update tvl
//     const tvlX = fetchTokenBalanceAmount(pool.tokenX, pool.id, tokenX.decimals);
//     const tvlY = fetchTokenBalanceAmount(pool.tokenY, pool.id, tokenY.decimals);
//     pool.tvlTokenX = tvlX;
//     pool.tvlTokenY = tvlY;
//     pool.tvlUSD = pool.tvlTokenX.times(tokenX.priceUSD).plus(pool.tvlTokenY.times(tokenY.priceUSD));

//     // TODO, tx count ?
//     pool.txCount = pool.txCount.plus(ONE_BI);
//     factory.txCount = factory.txCount.plus(ONE_BI);

//     const transaction = getOrCreateTransaction(event);
//     const decLimitOrder = new DecLimitOrder(decLimitOrderId);
//     decLimitOrder.transaction = transaction.id;
//     decLimitOrder.timestamp = transaction.timestamp;
//     decLimitOrder.pool = pool.id;
//     decLimitOrder.tokenX = pool.tokenX;
//     decLimitOrder.tokenY = pool.tokenY;
//     decLimitOrder.account = event.transaction.from;
//     decLimitOrder.withContract = event.transaction.to;

//     decLimitOrder.amount = amount;
//     decLimitOrder.point = BigInt.fromI32(event.params.point);
//     decLimitOrder.sellXEarnY = event.params.sellXEarnY;

//     decLimitOrder.amountUSD = amountUSD;
//     decLimitOrder.price = orderPrice;

//     decLimitOrder.logIndex = event.logIndex;

//     decLimitOrder.amountX = amountX;
//     decLimitOrder.amountY = amountY;

//     factory.save();
//     pool.save();
//     token.save();
//     decLimitOrder.save();
// }

// export function handleFlash(event: FlashEvent): void {
//     const pool = Pool.load(event.address.toHexString()) as Pool;
//     if (pool === null) {
//         return;
//     }

//     const factory = Factory.load(FACTORY_ADDRESS) as Factory;

//     const tokenX = Token.load(pool.tokenX) as Token;
//     const tokenY = Token.load(pool.tokenY) as Token;

//     const amountX = convertTokenToDecimal(event.params.amountX, tokenX.decimals);
//     const amountY = convertTokenToDecimal(event.params.amountY, tokenY.decimals);

//     const paidAmountX = convertTokenToDecimal(event.params.paidX, tokenX.decimals);
//     const paidAmountY = convertTokenToDecimal(event.params.paidY, tokenY.decimals);

//     updateTVL(pool, tokenX, paidAmountX, tokenY, paidAmountY, factory);

//     const transaction = getOrCreateTransaction(event);
//     const flash = new Flash(transaction.id + '#' + pool.txCount.toString());
//     flash.transaction = transaction.id;
//     flash.timestamp = transaction.timestamp;
//     flash.pool = pool.id;
//     flash.tokenX = pool.tokenX;
//     flash.tokenY = pool.tokenY;
//     flash.account = event.transaction.from;
//     flash.withContract = event.transaction.to;

//     flash.sender = event.params.sender;
//     flash.recipient = event.params.recipient;
//     flash.amountX = amountX;
//     flash.amountY = amountY;

//     flash.paidX = paidAmountX;
//     flash.paidY = paidAmountY;

//     flash.logIndex = event.logIndex;

//     pool.save();
//     flash.save();
//     tokenX.save();
//     tokenY.save();
// }
