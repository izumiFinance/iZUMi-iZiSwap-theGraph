import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const FACTORY_ADDRESS = '0x8c7d3063579BdB0b90997e18A770eaE32E1eBb08';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static stableCoins: Set<string>;

    static config(): Set<string> {
        if (this.stableCoins == null) {
            this.stableCoins = new Set();
            this.stableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.stableCoins.add('0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca'); // USDbC

        }

        return this.stableCoins;
    }
}


export class TrustableTokenConfig {
    static trustableTokens: Set<string>;

    static config(): Set<string> {
        if (this.trustableTokens == null) {
            this.trustableTokens = new Set();
            this.trustableTokens.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.trustableTokens.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            this.trustableTokens.add('0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca'); // USDbC
            this.trustableTokens.add('0x4200000000000000000000000000000000000006'); // WETH
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