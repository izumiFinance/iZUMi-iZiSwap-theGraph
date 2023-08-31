import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const FACTORY_ADDRESS = '0x575bfc57b0d3ea0d31b132d622643e71735a6957';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static stableCoins: Set<string>;

    static config(): Set<string> {
        if (this.stableCoins == null) {
            this.stableCoins = new Set();
            this.stableCoins.add('0x1382628e018010035999a1ff330447a0751aa84f'); // iUSD
            this.stableCoins.add('0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'); // USDC 
            this.stableCoins.add('0x2039bb4116b4efc145ec4f0e2ea75012d6c0f181'); // BUSD
            this.stableCoins.add('0x496d88d1efc3e145b7c12d53b78ce5e7eda7a42c'); // slUSDT

        }

        return this.stableCoins;
    }
}


export class TrustableTokenConfig {
    static trustableTokens: Set<string>;

    static config(): Set<string> {
        if (this.trustableTokens == null) {
            this.trustableTokens = new Set();
            this.trustableTokens.add('0x1382628e018010035999a1ff330447a0751aa84f'); // iUSD
            this.trustableTokens.add('0x5aea5775959fbc2557cc8789bc1bf90a239d9a91'); // WETH
            this.trustableTokens.add('0x16a9494e257703797d747540f01683952547ee5b'); // iZi
            this.trustableTokens.add('0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4'); // USDC
            this.trustableTokens.add('0x2039bb4116b4efc145ec4f0e2ea75012d6c0f181'); // BUSD
            this.trustableTokens.add('0x496d88d1efc3e145b7c12d53b78ce5e7eda7a42c'); // slUSDT
        }

        return this.trustableTokens;
    }
}

export class ERC20Info {
    address: string;
    symbol: string;
    name: string;
    decimals: BigInt;

    // Initialize a Token Definition with its attributes
    constructor(address: string, symbol: string, name: string, decimals: BigInt) {
        this.address = address;
        this.symbol = symbol;
        this.name = name;
        this.decimals = decimals;
    }
}

export class PresetTokenInfoHolder {
    static presetTokenInfoMapping: Map<string, ERC20Info>;

    static getMapping() : Map<string, ERC20Info> {
        if (this.presetTokenInfoMapping == null) {
            this.presetTokenInfoMapping = new Map<string, ERC20Info>();
            this.presetTokenInfoMapping.set(
                "0xe0b7927c4af23765cb51314a0e0521a9645f0e2a", new ERC20Info(
                    "0xe0b7927c4af23765cb51314a0e0521a9645f0e2a",
                    "DGD",
                    "DGD",
                    BigInt.fromI32(18),
                ),
            )
        }
        return this.presetTokenInfoMapping;
    }
}