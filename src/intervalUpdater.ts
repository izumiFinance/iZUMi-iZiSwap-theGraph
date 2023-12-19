import { ethereum } from '@graphprotocol/graph-ts';
import { Pool, PoolDayData, PoolHourData, Token, TokenDayData, TokenHourData } from '../generated/schema';
import { DAY_SECONDS, HOUR_SECONDS, ONE_BI, ZERO_BD, ZERO_BI } from './constants';

export function updatePoolDayData(event: ethereum.Event): PoolDayData {
    const timestamp = event.block.timestamp.toI32();
    const dayID = timestamp / DAY_SECONDS;
    const dayStartUnix = dayID * DAY_SECONDS;
    const dayPoolID = event.address
        .toHexString()
        .concat('-')
        .concat(dayID.toString());
    const pool = Pool.load(event.address.toHexString()) as Pool;

    let poolDayData = PoolDayData.load(dayPoolID);
    if (poolDayData === null) {
        poolDayData = new PoolDayData(dayPoolID);
        poolDayData.dayStartUnix = dayStartUnix;
        poolDayData.pool = pool.id;

        poolDayData.volumeTokenX = ZERO_BD;
        poolDayData.volumeTokenY = ZERO_BD;
        poolDayData.feesTokenX = ZERO_BD;
        poolDayData.feesTokenY = ZERO_BD;
        poolDayData.volumeUSD = ZERO_BD;
        poolDayData.feesUSD = ZERO_BD;
        poolDayData.txCount = ZERO_BI;

        poolDayData.open = pool.tokenXPrice;
        poolDayData.high = pool.tokenXPrice;
        poolDayData.low = pool.tokenXPrice;
        poolDayData.close = pool.tokenXPrice;
    }

    if (pool.tokenXPrice.gt(poolDayData.high)) {
        poolDayData.high = pool.tokenXPrice;
    }
    if (pool.tokenXPrice.lt(poolDayData.low)) {
        poolDayData.low = pool.tokenXPrice;
    }

    poolDayData.liquidity = pool.liquidity;
    poolDayData.sqrtPrice = pool.sqrtPrice;
    poolDayData.tokenXPrice = pool.tokenXPrice;
    poolDayData.tokenYPrice = pool.tokenYPrice;
    poolDayData.close = pool.tokenXPrice;
    poolDayData.tick = pool.tick;
    poolDayData.tvlUSD = pool.tvlUSD;
    poolDayData.txCount = poolDayData.txCount.plus(ONE_BI);
    // poolDayData.save();

    return poolDayData as PoolDayData;
}

export function updatePoolHourData(event: ethereum.Event): PoolHourData {
    const timestamp = event.block.timestamp.toI32();
    const hourID = timestamp / HOUR_SECONDS;
    const hourStartUnix = hourID * HOUR_SECONDS;
    const dayPoolID = event.address
        .toHexString()
        .concat('-')
        .concat(hourID.toString());
    const pool = Pool.load(event.address.toHexString()) as Pool;

    let poolHourData = PoolHourData.load(dayPoolID);
    if (poolHourData === null) {
        poolHourData = new PoolHourData(dayPoolID);
        poolHourData.hourStartUnix = hourStartUnix;
        poolHourData.pool = pool.id;

        poolHourData.volumeTokenX = ZERO_BD;
        poolHourData.volumeTokenY = ZERO_BD;
        poolHourData.feesTokenX = ZERO_BD;
        poolHourData.feesTokenY = ZERO_BD;
        poolHourData.volumeUSD = ZERO_BD;
        poolHourData.feesUSD = ZERO_BD;
        poolHourData.txCount = ZERO_BI;

        poolHourData.open = pool.tokenXPrice;
        poolHourData.high = pool.tokenXPrice;
        poolHourData.low = pool.tokenXPrice;
        poolHourData.close = pool.tokenXPrice;
    }

    if (pool.tokenXPrice.gt(poolHourData.high)) {
        poolHourData.high = pool.tokenXPrice;
    }
    if (pool.tokenXPrice.lt(poolHourData.low)) {
        poolHourData.low = pool.tokenXPrice;
    }

    poolHourData.liquidity = pool.liquidity;
    poolHourData.sqrtPrice = pool.sqrtPrice;
    poolHourData.tokenXPrice = pool.tokenXPrice;
    poolHourData.tokenYPrice = pool.tokenYPrice;
    poolHourData.close = pool.tokenXPrice;
    poolHourData.tick = pool.tick;
    poolHourData.tvlUSD = pool.tvlUSD;
    poolHourData.txCount = poolHourData.txCount.plus(ONE_BI);
    poolHourData.save();

    return poolHourData as PoolHourData;
}

export function updateTokenDayData(token: Token, event: ethereum.Event): TokenDayData {
    const timestamp = event.block.timestamp.toI32();
    const dayID = timestamp / DAY_SECONDS;
    const dayStartUnix = dayID * DAY_SECONDS;
    const tokenDayID = token.id
        .toString()
        .concat('-')
        .concat(dayID.toString());
    const tokenPrice = token.priceUSD;

    let tokenDayData = TokenDayData.load(tokenDayID);
    if (tokenDayData === null) {
        tokenDayData = new TokenDayData(tokenDayID);
        tokenDayData.date = dayStartUnix;
        tokenDayData.token = token.id;

        tokenDayData.volume = ZERO_BD;
        tokenDayData.volumeUSD = ZERO_BD;
        tokenDayData.feesUSD = ZERO_BD;
        tokenDayData.fees = ZERO_BD;

        tokenDayData.open = tokenPrice;
        tokenDayData.high = tokenPrice;
        tokenDayData.low = tokenPrice;
        tokenDayData.close = tokenPrice;
    }

    if (tokenPrice.gt(tokenDayData.high)) {
        tokenDayData.high = tokenPrice;
    }

    if (tokenPrice.lt(tokenDayData.low)) {
        tokenDayData.low = tokenPrice;
    }

    tokenDayData.close = tokenPrice;
    tokenDayData.tvl = token.tvl;
    tokenDayData.tvlUSD = token.tvlUSD;
    // tokenDayData.save();

    return tokenDayData as TokenDayData;
}


export function updateTokenHourData(token: Token, event: ethereum.Event): TokenHourData {
    const timestamp = event.block.timestamp.toI32();
    const dayID = timestamp / HOUR_SECONDS;
    const hourStartUnix = dayID * HOUR_SECONDS;
    const tokenDayID = token.id
        .toString()
        .concat('-')
        .concat(dayID.toString());
    const tokenPrice = token.priceUSD;

    let tokenHourData = TokenHourData.load(tokenDayID);
    if (tokenHourData === null) {
        tokenHourData = new TokenHourData(tokenDayID);
        tokenHourData.date = hourStartUnix;
        tokenHourData.token = token.id;

        tokenHourData.volume = ZERO_BD;
        tokenHourData.volumeUSD = ZERO_BD;
        tokenHourData.feesUSD = ZERO_BD;
        tokenHourData.fees = ZERO_BD;

        tokenHourData.open = tokenPrice;
        tokenHourData.high = tokenPrice;
        tokenHourData.low = tokenPrice;
        tokenHourData.close = tokenPrice;
    }

    if (tokenPrice.gt(tokenHourData.high)) {
        tokenHourData.high = tokenPrice;
    }

    if (tokenPrice.lt(tokenHourData.low)) {
        tokenHourData.low = tokenPrice;
    }

    tokenHourData.close = tokenPrice;
    tokenHourData.tvl = token.tvl;
    tokenHourData.tvlUSD = token.tvlUSD;
    tokenHourData.save();

    return tokenHourData as TokenHourData;
}
