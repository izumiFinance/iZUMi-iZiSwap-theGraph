import { Address, BigDecimal, BigInt, ByteArray } from '@graphprotocol/graph-ts';
import { ERC20 } from '../../generated/iZiSwapFactory/ERC20';
import { ERC20BytesMethod } from '../../generated/iZiSwapFactory/ERC20BytesMethod';
import { PresetTokenInfoHolder } from '../config';
import { ADDRESS_ZERO } from '../constants';
import { convertTokenToDecimal, isNullEthValue } from './funcs';

export function fetchTokenSymbol(tokenAddress: Address): string {
    const contract = ERC20.bind(tokenAddress);

    // try types string and bytes32 for symbol
    let symbolValue = 'unknown';
    const symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
        const contractSymbolBytes = ERC20BytesMethod.bind(tokenAddress);
        const symbolResultBytes = contractSymbolBytes.try_symbol();
        if (!symbolResultBytes.reverted) {
            // for broken pairs that have no symbol function exposed
            if (!isNullEthValue(symbolResultBytes.value.toHexString())) {
                symbolValue = symbolResultBytes.value.toString();
            } else {
                const tokenInfo = PresetTokenInfoHolder.getMapping().get(tokenAddress.toHexString());
                if (tokenInfo !== null) {
                  symbolValue = tokenInfo.symbol;
                }
            }
        } else {
            return ADDRESS_ZERO
        }
    } else {
        symbolValue = symbolResult.value;
    }

    return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string{
    const contract = ERC20.bind(tokenAddress);

    // try types string and bytes32 for name
    let nameValue = 'unknown';
    const nameResult = contract.try_name();
    if (nameResult.reverted) {
        const contractNameBytes = ERC20BytesMethod.bind(tokenAddress);
        const nameResultBytes = contractNameBytes.try_name();
        if (!nameResultBytes.reverted) {
            // for broken pairs that have no name function exposed
            if (!isNullEthValue(nameResultBytes.value.toHexString())) {
                nameValue = nameResultBytes.value.toString();
            } else {
                const tokenInfo = PresetTokenInfoHolder.getMapping().get(tokenAddress.toHexString());
                if (tokenInfo !== null) {
                  nameValue = tokenInfo.name;
                }
            }
        } else {
            return ''
        }
    } else {
        nameValue = nameResult.value;
    }

    return nameValue;
}

export function fetchTokenTotalSupply(tokenAddress: Address): BigInt {
    const contract = ERC20.bind(tokenAddress);
    const totalSupplyResult = contract.try_totalSupply();
    return totalSupplyResult.value;
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt | null {
    let contract = ERC20.bind(tokenAddress);
    // try types uint8 for decimals
    const decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        return BigInt.fromI32(decimalResult.value);
    } else {
        const tokenInfo = PresetTokenInfoHolder.getMapping().get(tokenAddress.toHexString());
        if (tokenInfo !== null) {
            return tokenInfo.decimals;
        }
    }
    return null;
}

export function fetchTokenBalanceAmount(tokenAddress: string, ownerAddress: string, decimal: BigInt): BigDecimal {
    let contract = ERC20.bind(Address.fromString(tokenAddress));
    const balance = contract.try_balanceOf(Address.fromString(ownerAddress));
    if (!balance.reverted) {
        return convertTokenToDecimal(balance.value, decimal);
    }
    return BigDecimal.fromString("0");
}

export const ERC20TransferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
