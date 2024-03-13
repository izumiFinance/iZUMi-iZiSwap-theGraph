import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export const FACTORY_ADDRESS = '0x45e5f26451cdb01b0fa1f8582e0aad9a6f27c218';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static stableCoins: Set<string>;

    static config(): Set<string> {
        if (this.stableCoins == null) {
            this.stableCoins = new Set();
            this.stableCoins.add('0xa219439258ca9da29e9cc4ce5596924745e12b93'); // USDT
            this.stableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.stableCoins.add('0x176211869ca2b568f2a7d4ee941e073a821ee1ff'); // USDC
            this.stableCoins.add('0x7d43AABC515C356145049227CeE54B608342c0ad'); // BUSD
        }

        return this.stableCoins;
    }
}


export class TrustableTokenConfig {
    static trustableTokens: Set<string>;

    static config(): Set<string> {
        if (this.trustableTokens == null) {
            this.trustableTokens = new Set();
            this.trustableTokens.add('0xa219439258ca9da29e9cc4ce5596924745e12b93'); // USDT
            this.trustableTokens.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.trustableTokens.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            this.trustableTokens.add('0x176211869ca2b568f2a7d4ee941e073a821ee1ff'); // USDC
            this.trustableTokens.add('0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f'); // WETH
            this.trustableTokens.add('0xb5bedd42000b71fdde22d3ee8a79bd49a568fc8f'); // wstETH
            this.trustableTokens.add('0x7d43AABC515C356145049227CeE54B608342c0ad'); // BUSD
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