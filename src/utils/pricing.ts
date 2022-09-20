import { BigDecimal, log } from "@graphprotocol/graph-ts";
import { Pool, Token } from "../../generated/schema";
import { MINIMUM_USD_LOCKED_FOR_PRICING, StableCoinConfig } from "../config";
import { ONE_BD, ZERO_BD, ZERO_BI } from "../constants";


export function findUsdPerToken(token: Token): BigDecimal {
    if (StableCoinConfig.config().has(token.id)) {
        return ONE_BD;
    }
    let largestLiquidityUSD = ZERO_BD;
    let tokenPrice = ZERO_BD;

    const trustablePools = token.trustablePools;
    for (let idx = 0; idx < trustablePools.length; ++idx) {
        const poolAddress = trustablePools[idx];
        const pool = Pool.load(poolAddress) as Pool;

        if (pool.liquidity.le(ZERO_BI)) {
            continue;
        }

        // trustable token is tokenY
        if (pool.tokenX == token.id) {
            const tokenY = Token.load(pool.tokenY) as Token;
            const usdLock = pool.tvlTokenY.times(tokenY.priceUSD);
            if (usdLock.le(largestLiquidityUSD) || usdLock.le(MINIMUM_USD_LOCKED_FOR_PRICING)) {
                continue;
            }
            largestLiquidityUSD = usdLock;
            tokenPrice = pool.tokenYPrice.times(tokenY.priceUSD)
        }

        if (pool.tokenY == token.id) {
            const tokenX = Token.load(pool.tokenX) as Token;
            const usdLock = pool.tvlTokenX.times(tokenX.priceUSD);
            if (usdLock.le(largestLiquidityUSD) || usdLock.le(MINIMUM_USD_LOCKED_FOR_PRICING)) {
                continue;
            }
            largestLiquidityUSD = usdLock;
            tokenPrice = pool.tokenXPrice.times(tokenX.priceUSD)
        }
    }

    return tokenPrice;
}