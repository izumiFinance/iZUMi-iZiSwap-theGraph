/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const ZERO_BI = BigInt.fromI32(0);
export const ONE_BI = BigInt.fromI32(1);
export const ZERO_BD = BigDecimal.fromString('0');
export const ONE_BD = BigDecimal.fromString('1');
export const TWO_BD = BigDecimal.fromString('2');
export const HUNDRED_BD = BigDecimal.fromString('100');
export const BI_18 = BigInt.fromI32(18);
export const E6_BI = BigInt.fromI32(1000000)

export const DAY_SECONDS = 86400;
export const HOUR_SECONDS = 3600;
