import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts';
import { iZiSwapLiquidityManager, Transfer as ERC721Transfer, AddLiquidity as AddLiquidityEvent, DecLiquidity as DecLiquidityEvent } from '../generated/iZiSwapLiquidityManager/iZiSwapLiquidityManager';
import { Liquidity, Token } from '../generated/schema';
import { ADDRESS_ZERO, ZERO_BD, ZERO_BI } from './constants';
import { getOrCreateTransaction } from './utils/contractHelper'
import { calculatetTick2PriceDecimal, convertTokenToDecimal, tick2PriceDecimal } from './utils/funcs';

function getOrCreateLiquidity(event: ethereum.Event, nftId: BigInt): Liquidity | null {
    let liquidity = Liquidity.load(nftId.toString());
    if (liquidity === null) {
        const liquidityManager = iZiSwapLiquidityManager.bind(event.address);
        const liquidityCall = liquidityManager.try_liquidities(nftId);

        if (!liquidityCall.reverted) {
            const liquidityResult = liquidityCall.value;
            const poolMeta = liquidityManager.poolMetas(liquidityResult.getPoolId());
            const poolAddress = liquidityManager.pool(poolMeta.getTokenX(), poolMeta.getTokenY(), poolMeta.getFee());

            liquidity = new Liquidity(nftId.toString());
            // The owner gets correctly updated in the Transfer handler
            liquidity.owner = Address.fromString(ADDRESS_ZERO);
            liquidity.pool = poolAddress.toHexString();
            liquidity.tokenX = poolMeta.getTokenX().toHexString();
            liquidity.tokenY = poolMeta.getTokenY().toHexString();
            liquidity.leftPt = BigInt.fromI32(liquidityResult.getLeftPt());
            liquidity.rightPt = BigInt.fromI32(liquidityResult.getRightPt());
            liquidity.liquidity = ZERO_BI;

            const tokenX = Token.load(liquidity.tokenX);
            const tokenY = Token.load(liquidity.tokenY);
            if (tokenX != null && tokenY != null) {
                liquidity.priceLeft = calculatetTick2PriceDecimal(liquidity.leftPt.toI32(), tokenX.decimals, tokenY.decimals)
                liquidity.priceRight = calculatetTick2PriceDecimal(liquidity.rightPt.toI32(), tokenX.decimals, tokenY.decimals)
            } else {
                liquidity.priceLeft = ZERO_BD;
                liquidity.priceRight = ZERO_BD;
            }

            liquidity.depositedTokenX = ZERO_BD;
            liquidity.depositedTokenY = ZERO_BD;
            liquidity.withdrawnTokenX = ZERO_BD;
            liquidity.withdrawnTokenY = ZERO_BD;
            liquidity.collectedFeesTokenX = ZERO_BD;
            liquidity.collectedFeesTokenY = ZERO_BD;
            liquidity.isValid = true;
            liquidity.transaction = getOrCreateTransaction(event).id;
            liquidity.save()
        }
    }

    return liquidity;
}

// TODO v2 with AddLiquidity, DecLiquidity event to related swap event to  
export function handleNftTransfer(event: ERC721Transfer): void {
    const liquidity = getOrCreateLiquidity(event, event.params.tokenId);

    if (liquidity == null) {
        return;
    }
    liquidity.owner = event.params.to;
    liquidity.isValid = ADDRESS_ZERO != event.params.to.toHexString();

    liquidity.save();
}

export function handleAddLiquidity(event: AddLiquidityEvent): void {
    let liquidity = getOrCreateLiquidity(event, event.params.nftId)

    if (liquidity == null) {
        return
    }

    let tokenX = Token.load(liquidity.tokenX)
    let tokenY = Token.load(liquidity.tokenY)

    if (tokenX == null || tokenY == null) {
        return
    }

    let amountX = convertTokenToDecimal(event.params.amountX, tokenX.decimals)
    let amountY = convertTokenToDecimal(event.params.amountY, tokenY.decimals)

    liquidity.liquidity = liquidity.liquidity.plus(event.params.liquidityDelta)
    liquidity.depositedTokenX = liquidity.depositedTokenX.plus(amountX)
    liquidity.depositedTokenY = liquidity.depositedTokenY.plus(amountY)

    liquidity.save()
}

export function handleDecLiquidity(event: DecLiquidityEvent): void {
    let liquidity = getOrCreateLiquidity(event, event.params.nftId)

    if (liquidity == null) {
        return
    }

    let tokenX = Token.load(liquidity.tokenX)
    let tokenY = Token.load(liquidity.tokenY)

    if (tokenX == null || tokenY == null) {
        return
    }

    let amountX = convertTokenToDecimal(event.params.amountX, tokenX.decimals)
    let amountY = convertTokenToDecimal(event.params.amountY, tokenY.decimals)

    liquidity.liquidity = liquidity.liquidity.minus(event.params.liquidityDelta)
    liquidity.withdrawnTokenX = liquidity.withdrawnTokenX.plus(amountX)
    liquidity.withdrawnTokenY = liquidity.withdrawnTokenY.plus(amountY)

    liquidity.save()
}
