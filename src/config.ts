import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const FACTORY_ADDRESS = '0x45e5f26451cdb01b0fa1f8582e0aad9a6f27c218';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static stableCoins: Set<string>;

    static config(): Set<string> {
        if (this.stableCoins == null) {
            this.stableCoins = new Set();
            this.stableCoins.add('0x201eba5cc46d216ce6dc03f6a759e8e766e956ae'); // USDT
            this.stableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.stableCoins.add('0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9'); // USDC

        }

        return this.stableCoins;
    }
}


export class TrustableTokenConfig {
    static trustableTokens: Set<string>;

    static config(): Set<string> {
        if (this.trustableTokens == null) {
            this.trustableTokens = new Set();
            this.trustableTokens.add('0x201eba5cc46d216ce6dc03f6a759e8e766e956ae'); // USDT
            this.trustableTokens.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.trustableTokens.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            this.trustableTokens.add('0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9'); // USDC
            this.trustableTokens.add('0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111'); // WETH
            this.trustableTokens.add('0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8'); // WMNT
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