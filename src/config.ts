import { BigDecimal, BigInt, TypedMap, dataSource } from '@graphprotocol/graph-ts';

// TODO dynamic
export const FACTORY_ADDRESS = '0x8c7d3063579bdb0b90997e18a770eae32e1ebb08';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class StableCoinConfig {
    static networkToStableCoins: TypedMap<string, Set<string>>;
    static emptyStableCoins: Set<string>;
    static config(): Set<string> {
        if (this.networkToStableCoins == null) {
            this.networkToStableCoins = new TypedMap<string, Set<string>>();
            this.emptyStableCoins = new Set<string>();
            // BSC
            let bscStableCoins = new Set<string>();
            bscStableCoins.add('0x55d398326f99059ff775485246999027b3197955'); // USDT
            bscStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            bscStableCoins.add('0xe9e7cea3dedca5984780bafc599bd69add087d56'); // BUSD
            bscStableCoins.add('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'); // USDC
            this.networkToStableCoins.set("bsc", bscStableCoins);

            // manta
            let mantaStableCoins = new Set<string>();
            mantaStableCoins.add('0xb73603C5d87fA094B7314C74ACE2e64D165016fb'); // USDC
            this.networkToStableCoins.set("manta", mantaStableCoins);

            // mantle
            let mantleStableCoins = new Set<string>();
            mantleStableCoins.add('0x201eba5cc46d216ce6dc03f6a759e8e766e956ae'); // USDT
            mantleStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            mantleStableCoins.add('0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9'); // USDC
            this.networkToStableCoins.set("mantle", mantleStableCoins);
        }

        const stableCoins = this.networkToStableCoins.get(dataSource.network());
        if (stableCoins !== null) {
            return stableCoins;
        } else {
            return this.emptyStableCoins;
        }
    }
}


export class TrustableTokenConfig {
    static networkToTrustableCoins: TypedMap<string, Set<string>>;
    static emptyTrustableCoins: Set<string>;
    static config(): Set<string> {
        if (this.networkToTrustableCoins == null) {
            this.networkToTrustableCoins = new TypedMap<string, Set<string>>();
            this.emptyTrustableCoins = new Set<string>();

            // BSC
            let bscTrustableCoins = new Set<string>();
            bscTrustableCoins.add('0x55d398326f99059ff775485246999027b3197955'); // USDT
            bscTrustableCoins.add('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'); // WBNB
            bscTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            bscTrustableCoins.add('0x2170ed0880ac9a755fd29b2688956bd959f933f8'); // WETH
            bscTrustableCoins.add('0xe9e7cea3dedca5984780bafc599bd69add087d56'); // BUSD
            bscTrustableCoins.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            bscTrustableCoins.add('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'); // USDC
            this.networkToTrustableCoins.set("bsc", bscTrustableCoins);

            // manta
            let mantaTrustableCoins = new Set<string>();
            mantaTrustableCoins.add('0xb73603c5d87fa094b7314c74ace2e64d165016fb'); // USDC
            mantaTrustableCoins.add('0x0dc808adce2099a9f62aa87d9670745aba741746'); // WETH
            mantaTrustableCoins.add('0xf417f5a458ec102b90352f697d6e2ac3a3d2851f'); // USDT
            mantaTrustableCoins.add('0x078f712f038a95beea94f036cadb49188a90604b'); // iUSD
            
            // mantle
            let mantleTrustableCoins = new Set<string>();
            mantleTrustableCoins.add('0x201eba5cc46d216ce6dc03f6a759e8e766e956ae'); // USDT
            mantleTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            mantleTrustableCoins.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            mantleTrustableCoins.add('0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9'); // USDC
            mantleTrustableCoins.add('0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111'); // WETH
            mantleTrustableCoins.add('0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8'); // WMNT

            this.networkToTrustableCoins.set("manta", mantaTrustableCoins);
        }

        const trustableTokens = this.networkToTrustableCoins.get(dataSource.network());
        if (trustableTokens !== null) {
            return trustableTokens;
        } else {
            return this.emptyTrustableCoins;
        }
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