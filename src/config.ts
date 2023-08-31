import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const FACTORY_ADDRESS = '0x93bb94a0d5269cb437a1f71ff3a77ab753844422';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static stableCoins: Set<string>;

    static config(): Set<string> {
        if (this.stableCoins == null) {
            this.stableCoins = new Set();
            this.stableCoins.add('0x55d398326f99059ff775485246999027b3197955'); // USDT
            this.stableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.stableCoins.add('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'); // USDC
            this.stableCoins.add('0x55a26773a8ba7fa9a8242b43e14a69488e6d2b05'); // slUSDC
            this.stableCoins.add('0x65cd2e7d7bacdac3aa9dae68fb5d548dfe1fefb5'); // slUSDT

        }

        return this.stableCoins;
    }
}


export class TrustableTokenConfig {
    static trustableTokens: Set<string>;

    static config(): Set<string> {
        if (this.trustableTokens == null) {
            this.trustableTokens = new Set();
            this.trustableTokens.add('0x55d398326f99059ff775485246999027b3197955'); // USDT
            this.trustableTokens.add('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'); // WBNB
            this.trustableTokens.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.trustableTokens.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            this.trustableTokens.add('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'); // USDC
            this.trustableTokens.add('0x55a26773a8ba7fa9a8242b43e14a69488e6d2b05'); // slUSDC
            this.trustableTokens.add('0x65cd2e7d7bacdac3aa9dae68fb5d548dfe1fefb5'); // slUSDT
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