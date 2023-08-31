import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const FACTORY_ADDRESS = '0x575bfc57b0d3ea0d31b132d622643e71735a6957';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static stableCoins: Set<string>;

    static config(): Set<string> {
        if (this.stableCoins == null) {
            this.stableCoins = new Set();
            this.stableCoins.add('0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'); // USDT
            this.stableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.stableCoins.add('0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'); // USDC
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
            this.trustableTokens.add('0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9'); // USDT
            this.trustableTokens.add('0x912ce59144191c1204e64559fe8253a0e49e6548'); // ARB
            this.trustableTokens.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.trustableTokens.add('0x82af49447d8a07e3bd95bd0d56f35241523fbab1'); // WETH
            this.trustableTokens.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            this.trustableTokens.add('0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'); // USDC
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