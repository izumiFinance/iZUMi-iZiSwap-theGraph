import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Transaction } from "../../generated/schema";
import { Pool } from "../../generated/templates/Pool/Pool";


export function getPoolState(poolAddress: Address) : i32 {
    const pool = Pool.bind(poolAddress);
    const poolState = pool.try_state();
    return poolState.value.getCurrentPoint();
}

export function getOrCreateTransaction(event: ethereum.Event): Transaction {
    let transaction = Transaction.load(event.transaction.hash.toHexString());
    if (transaction === null) {
        transaction = new Transaction(event.transaction.hash.toHexString());
    }
    transaction.blockNumber = event.block.number;
    transaction.timestamp = event.block.timestamp;
    transaction.gasLimit = event.transaction.gasLimit;
    transaction.gasPrice = event.transaction.gasPrice;
    transaction.save();

    return transaction as Transaction;
}
