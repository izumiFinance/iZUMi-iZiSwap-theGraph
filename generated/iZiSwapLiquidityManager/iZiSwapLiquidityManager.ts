// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class AddLiquidity extends ethereum.Event {
  get params(): AddLiquidity__Params {
    return new AddLiquidity__Params(this);
  }
}

export class AddLiquidity__Params {
  _event: AddLiquidity;

  constructor(event: AddLiquidity) {
    this._event = event;
  }

  get nftId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get pool(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get liquidityDelta(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get amountX(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get amountY(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class DecLiquidity extends ethereum.Event {
  get params(): DecLiquidity__Params {
    return new DecLiquidity__Params(this);
  }
}

export class DecLiquidity__Params {
  _event: DecLiquidity;

  constructor(event: DecLiquidity) {
    this._event = event;
  }

  get nftId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get pool(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get liquidityDelta(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get amountX(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get amountY(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class iZiSwapLiquidityManager__decLiquidityResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }

  getAmountX(): BigInt {
    return this.value0;
  }

  getAmountY(): BigInt {
    return this.value1;
  }
}

export class iZiSwapLiquidityManager__liquiditiesResult {
  value0: i32;
  value1: i32;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;

  constructor(
    value0: i32,
    value1: i32,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromI32(this.value0));
    map.set("value1", ethereum.Value.fromI32(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    return map;
  }

  getLeftPt(): i32 {
    return this.value0;
  }

  getRightPt(): i32 {
    return this.value1;
  }

  getLiquidity(): BigInt {
    return this.value2;
  }

  getLastFeeScaleX_128(): BigInt {
    return this.value3;
  }

  getLastFeeScaleY_128(): BigInt {
    return this.value4;
  }

  getRemainTokenX(): BigInt {
    return this.value5;
  }

  getRemainTokenY(): BigInt {
    return this.value6;
  }

  getPoolId(): BigInt {
    return this.value7;
  }
}

export class iZiSwapLiquidityManager__poolMetasResult {
  value0: Address;
  value1: Address;
  value2: i32;

  constructor(value0: Address, value1: Address, value2: i32) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2)),
    );
    return map;
  }

  getTokenX(): Address {
    return this.value0;
  }

  getTokenY(): Address {
    return this.value1;
  }

  getFee(): i32 {
    return this.value2;
  }
}

export class iZiSwapLiquidityManager extends ethereum.SmartContract {
  static bind(address: Address): iZiSwapLiquidityManager {
    return new iZiSwapLiquidityManager("iZiSwapLiquidityManager", address);
  }

  WETH9(): Address {
    let result = super.call("WETH9", "WETH9():(address)", []);

    return result[0].toAddress();
  }

  try_WETH9(): ethereum.CallResult<Address> {
    let result = super.tryCall("WETH9", "WETH9():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner),
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  baseURI(): string {
    let result = super.call("baseURI", "baseURI():(string)", []);

    return result[0].toString();
  }

  try_baseURI(): ethereum.CallResult<string> {
    let result = super.tryCall("baseURI", "baseURI():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  burn(lid: BigInt): boolean {
    let result = super.call("burn", "burn(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(lid),
    ]);

    return result[0].toBoolean();
  }

  try_burn(lid: BigInt): ethereum.CallResult<boolean> {
    let result = super.tryCall("burn", "burn(uint256):(bool)", [
      ethereum.Value.fromUnsignedBigInt(lid),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  createPool(
    tokenX: Address,
    tokenY: Address,
    fee: i32,
    initialPoint: i32,
  ): Address {
    let result = super.call(
      "createPool",
      "createPool(address,address,uint24,int24):(address)",
      [
        ethereum.Value.fromAddress(tokenX),
        ethereum.Value.fromAddress(tokenY),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee)),
        ethereum.Value.fromI32(initialPoint),
      ],
    );

    return result[0].toAddress();
  }

  try_createPool(
    tokenX: Address,
    tokenY: Address,
    fee: i32,
    initialPoint: i32,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createPool",
      "createPool(address,address,uint24,int24):(address)",
      [
        ethereum.Value.fromAddress(tokenX),
        ethereum.Value.fromAddress(tokenY),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee)),
        ethereum.Value.fromI32(initialPoint),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  decLiquidity(
    lid: BigInt,
    liquidDelta: BigInt,
    amountXMin: BigInt,
    amountYMin: BigInt,
    deadline: BigInt,
  ): iZiSwapLiquidityManager__decLiquidityResult {
    let result = super.call(
      "decLiquidity",
      "decLiquidity(uint256,uint128,uint256,uint256,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(lid),
        ethereum.Value.fromUnsignedBigInt(liquidDelta),
        ethereum.Value.fromUnsignedBigInt(amountXMin),
        ethereum.Value.fromUnsignedBigInt(amountYMin),
        ethereum.Value.fromUnsignedBigInt(deadline),
      ],
    );

    return new iZiSwapLiquidityManager__decLiquidityResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
    );
  }

  try_decLiquidity(
    lid: BigInt,
    liquidDelta: BigInt,
    amountXMin: BigInt,
    amountYMin: BigInt,
    deadline: BigInt,
  ): ethereum.CallResult<iZiSwapLiquidityManager__decLiquidityResult> {
    let result = super.tryCall(
      "decLiquidity",
      "decLiquidity(uint256,uint128,uint256,uint256,uint256):(uint256,uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(lid),
        ethereum.Value.fromUnsignedBigInt(liquidDelta),
        ethereum.Value.fromUnsignedBigInt(amountXMin),
        ethereum.Value.fromUnsignedBigInt(amountYMin),
        ethereum.Value.fromUnsignedBigInt(deadline),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new iZiSwapLiquidityManager__decLiquidityResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
      ),
    );
  }

  factory(): Address {
    let result = super.call("factory", "factory():(address)", []);

    return result[0].toAddress();
  }

  try_factory(): ethereum.CallResult<Address> {
    let result = super.tryCall("factory", "factory():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)],
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address,
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  liquidities(param0: BigInt): iZiSwapLiquidityManager__liquiditiesResult {
    let result = super.call(
      "liquidities",
      "liquidities(uint256):(int24,int24,uint128,uint256,uint256,uint256,uint256,uint128)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new iZiSwapLiquidityManager__liquiditiesResult(
      result[0].toI32(),
      result[1].toI32(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt(),
    );
  }

  try_liquidities(
    param0: BigInt,
  ): ethereum.CallResult<iZiSwapLiquidityManager__liquiditiesResult> {
    let result = super.tryCall(
      "liquidities",
      "liquidities(uint256):(int24,int24,uint128,uint256,uint256,uint256,uint256,uint128)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new iZiSwapLiquidityManager__liquiditiesResult(
        value[0].toI32(),
        value[1].toI32(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBigInt(),
      ),
    );
  }

  liquidityNum(): BigInt {
    let result = super.call("liquidityNum", "liquidityNum():(uint256)", []);

    return result[0].toBigInt();
  }

  try_liquidityNum(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("liquidityNum", "liquidityNum():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  pool(tokenX: Address, tokenY: Address, fee: i32): Address {
    let result = super.call("pool", "pool(address,address,uint24):(address)", [
      ethereum.Value.fromAddress(tokenX),
      ethereum.Value.fromAddress(tokenY),
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee)),
    ]);

    return result[0].toAddress();
  }

  try_pool(
    tokenX: Address,
    tokenY: Address,
    fee: i32,
  ): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "pool",
      "pool(address,address,uint24):(address)",
      [
        ethereum.Value.fromAddress(tokenX),
        ethereum.Value.fromAddress(tokenY),
        ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(fee)),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  poolIds(param0: Address): BigInt {
    let result = super.call("poolIds", "poolIds(address):(uint128)", [
      ethereum.Value.fromAddress(param0),
    ]);

    return result[0].toBigInt();
  }

  try_poolIds(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("poolIds", "poolIds(address):(uint128)", [
      ethereum.Value.fromAddress(param0),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  poolMetas(param0: BigInt): iZiSwapLiquidityManager__poolMetasResult {
    let result = super.call(
      "poolMetas",
      "poolMetas(uint128):(address,address,uint24)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new iZiSwapLiquidityManager__poolMetasResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toI32(),
    );
  }

  try_poolMetas(
    param0: BigInt,
  ): ethereum.CallResult<iZiSwapLiquidityManager__poolMetasResult> {
    let result = super.tryCall(
      "poolMetas",
      "poolMetas(uint128):(address,address,uint24)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new iZiSwapLiquidityManager__poolMetasResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toI32(),
      ),
    );
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)],
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index),
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index),
      ],
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt,
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get factory(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get weth(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddLiquidityCall extends ethereum.Call {
  get inputs(): AddLiquidityCall__Inputs {
    return new AddLiquidityCall__Inputs(this);
  }

  get outputs(): AddLiquidityCall__Outputs {
    return new AddLiquidityCall__Outputs(this);
  }
}

export class AddLiquidityCall__Inputs {
  _call: AddLiquidityCall;

  constructor(call: AddLiquidityCall) {
    this._call = call;
  }

  get addLiquidityParam(): AddLiquidityCallAddLiquidityParamStruct {
    return changetype<AddLiquidityCallAddLiquidityParamStruct>(
      this._call.inputValues[0].value.toTuple(),
    );
  }
}

export class AddLiquidityCall__Outputs {
  _call: AddLiquidityCall;

  constructor(call: AddLiquidityCall) {
    this._call = call;
  }

  get liquidityDelta(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get amountX(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }

  get amountY(): BigInt {
    return this._call.outputValues[2].value.toBigInt();
  }
}

export class AddLiquidityCallAddLiquidityParamStruct extends ethereum.Tuple {
  get lid(): BigInt {
    return this[0].toBigInt();
  }

  get xLim(): BigInt {
    return this[1].toBigInt();
  }

  get yLim(): BigInt {
    return this[2].toBigInt();
  }

  get amountXMin(): BigInt {
    return this[3].toBigInt();
  }

  get amountYMin(): BigInt {
    return this[4].toBigInt();
  }

  get deadline(): BigInt {
    return this[5].toBigInt();
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class BurnCall extends ethereum.Call {
  get inputs(): BurnCall__Inputs {
    return new BurnCall__Inputs(this);
  }

  get outputs(): BurnCall__Outputs {
    return new BurnCall__Outputs(this);
  }
}

export class BurnCall__Inputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get lid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class BurnCall__Outputs {
  _call: BurnCall;

  constructor(call: BurnCall) {
    this._call = call;
  }

  get success(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class CollectCall extends ethereum.Call {
  get inputs(): CollectCall__Inputs {
    return new CollectCall__Inputs(this);
  }

  get outputs(): CollectCall__Outputs {
    return new CollectCall__Outputs(this);
  }
}

export class CollectCall__Inputs {
  _call: CollectCall;

  constructor(call: CollectCall) {
    this._call = call;
  }

  get recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get lid(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get amountXLim(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get amountYLim(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class CollectCall__Outputs {
  _call: CollectCall;

  constructor(call: CollectCall) {
    this._call = call;
  }

  get amountX(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get amountY(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class CreatePoolCall extends ethereum.Call {
  get inputs(): CreatePoolCall__Inputs {
    return new CreatePoolCall__Inputs(this);
  }

  get outputs(): CreatePoolCall__Outputs {
    return new CreatePoolCall__Outputs(this);
  }
}

export class CreatePoolCall__Inputs {
  _call: CreatePoolCall;

  constructor(call: CreatePoolCall) {
    this._call = call;
  }

  get tokenX(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenY(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get fee(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get initialPoint(): i32 {
    return this._call.inputValues[3].value.toI32();
  }
}

export class CreatePoolCall__Outputs {
  _call: CreatePoolCall;

  constructor(call: CreatePoolCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class DecLiquidityCall extends ethereum.Call {
  get inputs(): DecLiquidityCall__Inputs {
    return new DecLiquidityCall__Inputs(this);
  }

  get outputs(): DecLiquidityCall__Outputs {
    return new DecLiquidityCall__Outputs(this);
  }
}

export class DecLiquidityCall__Inputs {
  _call: DecLiquidityCall;

  constructor(call: DecLiquidityCall) {
    this._call = call;
  }

  get lid(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get liquidDelta(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get amountXMin(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get amountYMin(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get deadline(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class DecLiquidityCall__Outputs {
  _call: DecLiquidityCall;

  constructor(call: DecLiquidityCall) {
    this._call = call;
  }

  get amountX(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get amountY(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }
}

export class MintCall extends ethereum.Call {
  get inputs(): MintCall__Inputs {
    return new MintCall__Inputs(this);
  }

  get outputs(): MintCall__Outputs {
    return new MintCall__Outputs(this);
  }
}

export class MintCall__Inputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get mintParam(): MintCallMintParamStruct {
    return changetype<MintCallMintParamStruct>(
      this._call.inputValues[0].value.toTuple(),
    );
  }
}

export class MintCall__Outputs {
  _call: MintCall;

  constructor(call: MintCall) {
    this._call = call;
  }

  get lid(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }

  get liquidity(): BigInt {
    return this._call.outputValues[1].value.toBigInt();
  }

  get amountX(): BigInt {
    return this._call.outputValues[2].value.toBigInt();
  }

  get amountY(): BigInt {
    return this._call.outputValues[3].value.toBigInt();
  }
}

export class MintCallMintParamStruct extends ethereum.Tuple {
  get miner(): Address {
    return this[0].toAddress();
  }

  get tokenX(): Address {
    return this[1].toAddress();
  }

  get tokenY(): Address {
    return this[2].toAddress();
  }

  get fee(): i32 {
    return this[3].toI32();
  }

  get pl(): i32 {
    return this[4].toI32();
  }

  get pr(): i32 {
    return this[5].toI32();
  }

  get xLim(): BigInt {
    return this[6].toBigInt();
  }

  get yLim(): BigInt {
    return this[7].toBigInt();
  }

  get amountXMin(): BigInt {
    return this[8].toBigInt();
  }

  get amountYMin(): BigInt {
    return this[9].toBigInt();
  }

  get deadline(): BigInt {
    return this[10].toBigInt();
  }
}

export class MintDepositCallbackCall extends ethereum.Call {
  get inputs(): MintDepositCallbackCall__Inputs {
    return new MintDepositCallbackCall__Inputs(this);
  }

  get outputs(): MintDepositCallbackCall__Outputs {
    return new MintDepositCallbackCall__Outputs(this);
  }
}

export class MintDepositCallbackCall__Inputs {
  _call: MintDepositCallbackCall;

  constructor(call: MintDepositCallbackCall) {
    this._call = call;
  }

  get x(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get y(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get data(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class MintDepositCallbackCall__Outputs {
  _call: MintDepositCallbackCall;

  constructor(call: MintDepositCallbackCall) {
    this._call = call;
  }
}

export class MulticallCall extends ethereum.Call {
  get inputs(): MulticallCall__Inputs {
    return new MulticallCall__Inputs(this);
  }

  get outputs(): MulticallCall__Outputs {
    return new MulticallCall__Outputs(this);
  }
}

export class MulticallCall__Inputs {
  _call: MulticallCall;

  constructor(call: MulticallCall) {
    this._call = call;
  }

  get data(): Array<Bytes> {
    return this._call.inputValues[0].value.toBytesArray();
  }
}

export class MulticallCall__Outputs {
  _call: MulticallCall;

  constructor(call: MulticallCall) {
    this._call = call;
  }

  get results(): Array<Bytes> {
    return this._call.outputValues[0].value.toBytesArray();
  }
}

export class RefundETHCall extends ethereum.Call {
  get inputs(): RefundETHCall__Inputs {
    return new RefundETHCall__Inputs(this);
  }

  get outputs(): RefundETHCall__Outputs {
    return new RefundETHCall__Outputs(this);
  }
}

export class RefundETHCall__Inputs {
  _call: RefundETHCall;

  constructor(call: RefundETHCall) {
    this._call = call;
  }
}

export class RefundETHCall__Outputs {
  _call: RefundETHCall;

  constructor(call: RefundETHCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class SetBaseURICall extends ethereum.Call {
  get inputs(): SetBaseURICall__Inputs {
    return new SetBaseURICall__Inputs(this);
  }

  get outputs(): SetBaseURICall__Outputs {
    return new SetBaseURICall__Outputs(this);
  }
}

export class SetBaseURICall__Inputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }

  get newBaseURI(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class SetBaseURICall__Outputs {
  _call: SetBaseURICall;

  constructor(call: SetBaseURICall) {
    this._call = call;
  }
}

export class SweepTokenCall extends ethereum.Call {
  get inputs(): SweepTokenCall__Inputs {
    return new SweepTokenCall__Inputs(this);
  }

  get outputs(): SweepTokenCall__Outputs {
    return new SweepTokenCall__Outputs(this);
  }
}

export class SweepTokenCall__Inputs {
  _call: SweepTokenCall;

  constructor(call: SweepTokenCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get minAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get recipient(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class SweepTokenCall__Outputs {
  _call: SweepTokenCall;

  constructor(call: SweepTokenCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnwrapWETH9Call extends ethereum.Call {
  get inputs(): UnwrapWETH9Call__Inputs {
    return new UnwrapWETH9Call__Inputs(this);
  }

  get outputs(): UnwrapWETH9Call__Outputs {
    return new UnwrapWETH9Call__Outputs(this);
  }
}

export class UnwrapWETH9Call__Inputs {
  _call: UnwrapWETH9Call;

  constructor(call: UnwrapWETH9Call) {
    this._call = call;
  }

  get minAmount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class UnwrapWETH9Call__Outputs {
  _call: UnwrapWETH9Call;

  constructor(call: UnwrapWETH9Call) {
    this._call = call;
  }
}
