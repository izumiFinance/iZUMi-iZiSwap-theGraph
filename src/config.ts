import { BigDecimal, BigInt, TypedMap, dataSource } from '@graphprotocol/graph-ts';
import { ADDRESS_ZERO } from './constants';

// TODO dynamic
// export const FACTORY_ADDRESS = '0x8c7d3063579bdb0b90997e18a770eae32e1ebb08';

export const MINIMUM_USD_LOCKED_FOR_PRICING = BigDecimal.fromString('2000');

export class FactoryConfig {
    static factoryAddress: TypedMap<string, string>;
    static emptyAddress: string;
    static getAddress(): string {
        if (this.factoryAddress == null) {
            this.factoryAddress = new TypedMap<string, string>();
            this.emptyAddress = ADDRESS_ZERO
            this.factoryAddress.set("bsc", "0x93bb94a0d5269cb437a1f71ff3a77ab753844422");
            this.factoryAddress.set("manta", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("mantle", "0x45e5f26451cdb01b0fa1f8582e0aad9a6f27c218");
            this.factoryAddress.set("linea", "0x45e5f26451cdb01b0fa1f8582e0aad9a6f27c218");
            this.factoryAddress.set("scroll", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("kroma", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("mode", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("merlin", "0xe29a6620dac789b8a76e9b9ec8fe9b7cf2b663d5");
            this.factoryAddress.set("map", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("ainn", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("klaytn", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
            this.factoryAddress.set("rootstock", "0x8c7d3063579bdb0b90997e18a770eae32e1ebb08");
        }
        const address = this.factoryAddress.get(dataSource.network());
        if (address !== null) {
            return address;
        } else {
            return this.emptyAddress;
        }
    }
}

export const FACTORY_ADDRESS = FactoryConfig.getAddress()

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
            mantaStableCoins.add('0xb73603c5d87fa094b7314c74ace2e64d165016fb'); // USDC
            mantaStableCoins.add('0xf417f5a458ec102b90352f697d6e2ac3a3d2851f'); // USDT
            mantaStableCoins.add('0x078f712f038a95beea94f036cadb49188a90604b'); // iUSD
            this.networkToStableCoins.set("manta", mantaStableCoins);

            // mantle
            let mantleStableCoins = new Set<string>();
            mantleStableCoins.add('0x201eba5cc46d216ce6dc03f6a759e8e766e956ae'); // USDT
            mantleStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            mantleStableCoins.add('0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9'); // USDC
            this.networkToStableCoins.set("mantle", mantleStableCoins);

            // linea
            let lineaStableCoins = new Set<string>();
            lineaStableCoins.add('0xa219439258ca9da29e9cc4ce5596924745e12b93'); // USDT
            lineaStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            lineaStableCoins.add('0x176211869ca2b568f2a7d4ee941e073a821ee1ff'); // USDC
            lineaStableCoins.add('0x7d43aabc515c356145049227cee54b608342c0ad'); // BUSD
            this.networkToStableCoins.set("linea", lineaStableCoins);

            // scroll
            let scrollStableCoins = new Set<string>();
            scrollStableCoins.add('0xf55bec9cafdbe8730f096aa55dad6d22d44099df'); // USDT
            scrollStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            scrollStableCoins.add('0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4'); // USDC
            this.networkToStableCoins.set("scroll", scrollStableCoins);

            // kroma
            let kromaStableCoins = new Set<string>();
            kromaStableCoins.add('0x0cf7c2a584988871b654bd79f96899e4cd6c41c0'); // USDT
            kromaStableCoins.add('0x0257e4d92c00c9efcca1d641b224d7d09cfa4522'); // USDC
            this.networkToStableCoins.set("kroma", kromaStableCoins);

            //mode
            let modeStableCoins = new Set<string>();
            modeStableCoins.add('0xf0f161fda2712db8b566946122a5af183995e2ed'); // USDT
            modeStableCoins.add('0xd988097fb8612cc24eec14542bc03424c656005f'); // USDC
            this.networkToStableCoins.set("mode", modeStableCoins);

            //merlin
            let merlinStableCoins = new Set<string>();
            merlinStableCoins.add('0x967aec3276b63c5e2262da9641db9dbebb07dc0d'); // M-USDT
            merlinStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.networkToStableCoins.set("merlin", merlinStableCoins);

            //map
            let mapStableCoins = new Set<string>();
            mapStableCoins.add('0x33daba9618a75a7aff103e53afe530fbacf4a3dd'); // USDT
            mapStableCoins.add('0x61899ce1396ff351e5fdb9c8ad36fee9411c73c2'); // iUSD
            this.networkToStableCoins.set("map", mapStableCoins);

            //Ainn
            let ainnStableCoins = new Set<string>();
            ainnStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            this.networkToStableCoins.set("ainn", ainnStableCoins);

            //Klaytn
            let klaytnStableCoins = new Set<string>();
            klaytnStableCoins.add('0xe2053bcf56d2030d2470fb454574237cf9ee3d4b'); // USDC.e
            klaytnStableCoins.add('0x608792deb376cce1c9fa4d0e6b7b44f507cffa6a'); // USDC
            klaytnStableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            klaytnStableCoins.add('0x5c13e303a62fc5dedf5b52d66873f2e59fedadc2'); // USDT
            this.networkToStableCoins.set("klaytn", klaytnStableCoins);

            //rootstock
            let rootstockStableCoins = new Set<string>();
            rootstockStableCoins.add('0xef213441a85df4d7acbdae0cf78004e1e486bb96'); // rUSDT
            this.networkToStableCoins.set("rootstock", rootstockStableCoins);
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
            this.networkToTrustableCoins.set("manta", mantaTrustableCoins);

            // mantle
            let mantleTrustableCoins = new Set<string>();
            mantleTrustableCoins.add('0x201eba5cc46d216ce6dc03f6a759e8e766e956ae'); // USDT
            mantleTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            mantleTrustableCoins.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            mantleTrustableCoins.add('0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9'); // USDC
            mantleTrustableCoins.add('0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111'); // WETH
            mantleTrustableCoins.add('0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8'); // WMNT
            this.networkToTrustableCoins.set("mantle", mantleTrustableCoins);

            // linea
            let lineaTrustableCoins = new Set<string>();
            lineaTrustableCoins.add('0xa219439258ca9da29e9cc4ce5596924745e12b93'); // USDT
            lineaTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            lineaTrustableCoins.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            lineaTrustableCoins.add('0x176211869ca2b568f2a7d4ee941e073a821ee1ff'); // USDC
            lineaTrustableCoins.add('0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f'); // WETH
            lineaTrustableCoins.add('0xb5bedd42000b71fdde22d3ee8a79bd49a568fc8f'); // wstETH
            lineaTrustableCoins.add('0x7d43aabc515c356145049227cee54b608342c0ad'); // BUSD
            this.networkToTrustableCoins.set("linea", lineaTrustableCoins);

            // scroll
            let scrollTrustableCoins = new Set<string>();
            scrollTrustableCoins.add('0xf55bec9cafdbe8730f096aa55dad6d22d44099df'); // USDT
            scrollTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            scrollTrustableCoins.add('0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4'); // USDC
            scrollTrustableCoins.add('0x5300000000000000000000000000000000000004'); // WETH
            scrollTrustableCoins.add('0xf610a9dfb7c89644979b4a0f27063e9e7d7cda32'); // wstETH
            scrollTrustableCoins.add('0x60d01ec2d5e98ac51c8b4cf84dfcce98d527c747'); // iZi
            this.networkToTrustableCoins.set("scroll", scrollTrustableCoins);

            // kroma
            let kromaTrustableCoins = new Set<string>();
            kromaTrustableCoins.add('0x0cf7c2a584988871b654bd79f96899e4cd6c41c0'); // USDT
            kromaTrustableCoins.add('0x0257e4d92c00c9efcca1d641b224d7d09cfa4522'); // USDC
            kromaTrustableCoins.add('0x4200000000000000000000000000000000000001'); // WETH
            kromaTrustableCoins.add('0x57b5284ba55a1170b4d3e5c0d4fa22bac893b291'); // iZi
            this.networkToTrustableCoins.set("kroma", kromaTrustableCoins);

            //mode
            let modeTrustableCoins = new Set<string>();
            modeTrustableCoins.add('0xf0f161fda2712db8b566946122a5af183995e2ed'); // USDT
            modeTrustableCoins.add('0x4200000000000000000000000000000000000006'); // WETH
            modeTrustableCoins.add('0xd988097fb8612cc24eec14542bc03424c656005f'); // USDC
            this.networkToTrustableCoins.set("mode", modeTrustableCoins);

            //merlin
            let merlinTrustableCoins = new Set<string>();
            merlinTrustableCoins.add('0x967aec3276b63c5e2262da9641db9dbebb07dc0d'); // M-USDT
            merlinTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            merlinTrustableCoins.add('0xf6d226f9dc15d9bb51182815b320d3fbe324e1ba'); // WBTC
            merlinTrustableCoins.add('0xb880fd278198bd590252621d4cd071b1842e9bcd'); // M-BTC
            merlinTrustableCoins.add('0x41d9036454be47d3745a823c4aacd0e29cfb0f71'); // SolvBTC
            merlinTrustableCoins.add('0xbd40c74cb5cf9f9252b3298230cb916d80430bba'); // MP
            merlinTrustableCoins.add('0x480e158395cc5b41e5584347c495584ca2caf78d'); // VOYA
            merlinTrustableCoins.add('0x7a677e59dc2c8a42d6af3a62748c5595034a008b'); // HUHU
            this.networkToTrustableCoins.set("merlin", merlinTrustableCoins);

            //map
            let mapTrustableCoins = new Set<string>();
            mapTrustableCoins.add('0x33daba9618a75a7aff103e53afe530fbacf4a3dd'); // USDT
            mapTrustableCoins.add('0x61899ce1396ff351e5fdb9c8ad36fee9411c73c2'); // iUSD
            mapTrustableCoins.add('0x13cb04d4a5dfb6398fc5ab005a6c84337256ee23'); // WMAPO
            mapTrustableCoins.add('0x9bd1e0a3a727d0d4f4e9a6d59022e071ddc79924'); // stMAPO
            mapTrustableCoins.add('0x05ab928d446d8ce6761e368c8e7be03c3168a9ec'); // WETH
            mapTrustableCoins.add('0x1ddecb7126028ea347408edef9d218f74b226d22'); //FOX2
            mapTrustableCoins.add('0x756af1d3810a01d3292fad62f295bbcc6c200aea'); //LSGS
            mapTrustableCoins.add('0xb877e3562a660c7861117c2f1361a26abaf19beb'); //BTC
            mapTrustableCoins.add('0x1d22c0ab633f393c84a98cf4f2fad10ba47bb7b3'); //M-BTC
            mapTrustableCoins.add('0x7eb8b1fe3ee3287fd5864e50f32322ce3285b39d'); //SolvBTC
            this.networkToTrustableCoins.set("map", mapTrustableCoins);

            //Ainn
            let ainnTrustableCoins = new Set<string>();
            ainnTrustableCoins.add('0x1470a4831f76954686bfb4de8180f7469ea8de6f'); // ABTC
            ainnTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            ainnTrustableCoins.add('0xc5ed6c946cdc82f4599f0f2f012e1822502e70e3'); // AINN
            this.networkToTrustableCoins.set("ainn", ainnTrustableCoins);

            //Klaytn
            let klaytnTrustableCoins = new Set<string>();
            klaytnTrustableCoins.add('0xe2053bcf56d2030d2470fb454574237cf9ee3d4b'); // USDC.e
            klaytnTrustableCoins.add('0x608792deb376cce1c9fa4d0e6b7b44f507cffa6a'); // USDC
            klaytnTrustableCoins.add('0x0a3bb08b3a15a19b4de82f8acfc862606fb69a2d'); // iUSD
            klaytnTrustableCoins.add('0x5c13e303a62fc5dedf5b52d66873f2e59fedadc2'); // USDT
            klaytnTrustableCoins.add('0x19aac5f612f524b754ca7e7c41cbfa2e981a4432'); // WKLAY
            this.networkToTrustableCoins.set("klaytn", klaytnTrustableCoins);

            //rootstock
            let rootstockTrustableCoins = new Set<string>();
            rootstockTrustableCoins.add('0xef213441a85df4d7acbdae0cf78004e1e486bb96'); // rUSDT
            rootstockTrustableCoins.add('0x542fda317318ebf1d3deaf76e0b632741a7e677d'); // WRBTC
            this.networkToTrustableCoins.set("rootstock", rootstockTrustableCoins);
        }

        const trustableTokens = this.networkToTrustableCoins.get(dataSource.network());
        if (trustableTokens !== null) {
            return trustableTokens;
        } else {
            return this.emptyTrustableCoins;
        }
    }
}

class WrapGasTokenReturn {
    wrapGasToken: string = ADDRESS_ZERO;
    whitePool: string = ADDRESS_ZERO;
}

export class WrapGasTokenConfig {
    static networkToWrapGasTokens: TypedMap<string, string>;
    static networkToWhitePools: TypedMap<string, string>;
    static emptyWrapGasToken: string;
    static emptyWhitePool: string;

    static config():WrapGasTokenReturn {
        if (this.networkToWrapGasTokens == null) {
            this.networkToWrapGasTokens = new TypedMap<string, string>();
            this.networkToWhitePools = new TypedMap<string, string>();
            this.emptyWrapGasToken = ADDRESS_ZERO;
            this.emptyWhitePool = ADDRESS_ZERO;

            // BSC
            let bscWrapGasToken = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
            let bscWhitePool = '0x1ce3082de766ebfe1b4db39f616426631bbb29ac';
            this.networkToWrapGasTokens.set("bsc", bscWrapGasToken);
            this.networkToWhitePools.set("bsc", bscWhitePool);

            // Manta
            let mantaWrapGasToken = '0x0dc808adce2099a9f62aa87d9670745aba741746';
            let mantaWhitePool = '0x61a9e5037c311ac76400be7f6e73faeb3c076ab0';
            this.networkToWrapGasTokens.set("manta", mantaWrapGasToken);
            this.networkToWhitePools.set("manta", mantaWhitePool);

            // Mantle
            let mantleWrapGasToken = '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111';
            let mantleWhitePool = '0xbe18aad013699c1cdd903cb3e6d596ef99c37650';
            this.networkToWrapGasTokens.set("mantle", mantleWrapGasToken);
            this.networkToWhitePools.set("mantle", mantleWhitePool);

            // Linea
            let lineaWrapGasToken = '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f';
            let lineaWhitePool = '0x564e52bbdf3adf10272f3f33b00d65b2ee48afff';
            this.networkToWrapGasTokens.set("linea", lineaWrapGasToken);
            this.networkToWhitePools.set("linea", lineaWhitePool);

            // Scroll
            let scrollWrapGasToken = '0x5300000000000000000000000000000000000004';
            let scrollWhitePool = '0x8f8ed95b3b3ed2979d1ee528f38ca3e481a94dd9';
            this.networkToWrapGasTokens.set("scroll", scrollWrapGasToken);
            this.networkToWhitePools.set("scroll", scrollWhitePool);

            // Kroma
            let kromaWrapGasToken = '0x4200000000000000000000000000000000000001';
            let kromaWhitePool = '0x6e34ca775fb0e1548c8959d8d1f80975e90ccb0e';
            this.networkToWrapGasTokens.set("kroma", kromaWrapGasToken);
            this.networkToWhitePools.set("kroma", kromaWhitePool);
        }

        let wrapGasToken = this.networkToWrapGasTokens.get(dataSource.network());
        let whitePool = this.networkToWhitePools.get(dataSource.network());

        if (wrapGasToken === null) wrapGasToken = this.emptyWrapGasToken;
        if (whitePool === null) whitePool = this.emptyWhitePool;

        let result = new WrapGasTokenReturn();
        result.wrapGasToken = wrapGasToken;
        result.whitePool = whitePool;

        return result;
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