import { log, Address, BigInt } from '@graphprotocol/graph-ts';
import { NewPool } from '../generated/iZiSwapFactory/iZiSwapFactory';
import { Factory, Pool, Token } from '../generated/schema';
import { ONE_BD, ONE_BI, ZERO_BD, ZERO_BI } from './constants';
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol, fetchTokenTotalSupply } from './utils/tokenHelper';
import { Pool as PoolTemplate } from '../generated/templates';
import { FACTORY_ADDRESS, StableCoinConfig } from './config';
import { findUsdPerToken } from './utils/pricing';

export function handleNewPool(event: NewPool): void {
    const factory = getOrCreateFactoryEntity(FACTORY_ADDRESS);
    factory.poolCount = factory.poolCount.plus(ONE_BI);

    const pool = new Pool(event.params.pool.toHexString()) as Pool;

    const tokenX = getOrCreateTokenEntity(event.params.tokenX);
    if (tokenX === null) return;

    const tokenY = getOrCreateTokenEntity(event.params.tokenY);
    if (tokenY === null) return;

    if (StableCoinConfig.config().has(tokenX.id)) {
        // push direct not change effect
        let newPools = tokenY.trustablePools;
        newPools.push(pool.id);
        tokenY.trustablePools = newPools;
    }
    if (StableCoinConfig.config().has(tokenY.id)) {
        let newPools = tokenX.trustablePools;
        newPools.push(pool.id);
        tokenX.trustablePools = newPools;
    }

    pool.createdAtTimestamp = event.block.timestamp;
    pool.createdAtBlockNumber = event.block.number;
    pool.tokenX = tokenX.id;
    pool.tokenY = tokenY.id;
    pool.feeTier = BigInt.fromI32(event.params.fee);

    pool.txCount = ZERO_BI;

    pool.liquidity = ZERO_BI;
    pool.tick = ZERO_BI;
    pool.sqrtPrice = ZERO_BI;

    pool.tokenXPrice = ZERO_BD;
    pool.tokenYPrice = ZERO_BD;

    pool.volumeUSD = ZERO_BD;
    pool.volumeTokenX = ZERO_BD;
    pool.volumeTokenY = ZERO_BD;
    pool.feesUSD = ZERO_BD;

    pool.tvlTokenX = ZERO_BD;
    pool.tvlTokenY = ZERO_BD;
    pool.tvlUSD = ZERO_BD;

    pool.collectedFeesTokenX = ZERO_BD;
    pool.collectedFeesTokenY = ZERO_BD;
    pool.collectedFeesUSD = ZERO_BD;
    pool.feesTokenX = ZERO_BD;
    pool.feesTokenY = ZERO_BD;

    pool.save();

    // Listen event for Dynamically Created Contracts
    PoolTemplate.create(event.params.pool);

    factory.save();

    tokenX.priceUSD = findUsdPerToken(tokenX);
    tokenY.priceUSD = findUsdPerToken(tokenY);
    tokenX.save();
    tokenY.save();
}

function getOrCreateFactoryEntity(factoryAddress: string): Factory {
    let factory = Factory.load(factoryAddress);
    if (factory === null) {
        factory = new Factory(factoryAddress);
        factory.poolCount = ZERO_BI;
        factory.txCount = ZERO_BI;
        factory.totalVolumeUSD = ZERO_BD;
        factory.totalFeesUSD = ZERO_BD;
        factory.tvlUSD = ZERO_BD;

        // TODO handle all initial
    }

    return factory;
}

function getOrCreateTokenEntity(tokenAddress: Address): Token | null {
    let token = Token.load(tokenAddress.toHexString());
    if (token === null) {
        token = new Token(tokenAddress.toHexString());
        token.symbol = fetchTokenSymbol(tokenAddress);
        token.name = fetchTokenName(tokenAddress);
        token.totalSupply = fetchTokenTotalSupply(tokenAddress);
        const decimals = fetchTokenDecimals(tokenAddress);

        // bail if we couldn't figure out the decimals
        if (decimals === null) {
            log.debug('may bug the decimal on token was null', []);
            return null;
        }
        token.decimals = decimals;

        token.txCount = ZERO_BI;
        token.poolCount = ZERO_BI;

        token.priceUSD = ZERO_BD;
        token.trustablePools = [];

        token.feesUSD = ZERO_BD;
        token.fees = ZERO_BD;

        token.volume = ZERO_BD;
        token.volumeUSD = ZERO_BD;

        token.tvl = ZERO_BD;
        token.tvlUSD = ZERO_BD;
    }
    token.poolCount = token.poolCount.plus(ONE_BI);
    return token;
}
