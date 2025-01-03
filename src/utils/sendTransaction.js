import { createTransactions, Resolver, RpcClient, PrivateKey, Address } from "../kaspa-wasm32-sdk/web/kaspa/kaspa.js";
import load from "../kaspa-wasm32-sdk/web/kaspa/kaspa.js";
import { Buffer } from 'buffer';

export const sendTransaction = async (privateKey, peerAddress, userMessage, networkIdentifier, kaspaNodeWrpc) => {    
    try {
        await load(); 
        // resolver: new Resolver(),
        const rpc = new RpcClient({
            url: kaspaNodeWrpc,
            networkId: networkIdentifier
        })
        await rpc.connect();
        let is_connected = await rpc.isConnected;
        console.log("Connected to Kaspad: ", is_connected);
        const { networkId } = await rpc.getServerInfo();
        const privateKeyObject = new PrivateKey(privateKey)
        const userAddressObject = privateKeyObject.toAddress(networkId);
        const peerAddressObject = new Address(peerAddress);
        const { entries } = await rpc.getUtxosByAddresses([ userAddressObject ])
        let selected_utxo = entries[0]
        const KASPATALK_PROTOCOL_PREFIX = "ktk:"
        let formattedUserMessage = KASPATALK_PROTOCOL_PREFIX + (userAddressObject.toString()) + "|" + userMessage

        const { transactions } = await createTransactions({
            networkId,
            entries: [selected_utxo],
            outputs: [],
            changeAddress: peerAddressObject,
            priorityFee: 0n,
            payload: Buffer.from(formattedUserMessage).toString('hex')
        })

        for (const transaction of transactions) {
            transaction.sign([ privateKeyObject ])
            await transaction.submit(rpc)
                //console.log("Final transaction:")
                //console.log(transaction)
                console.log("Fees:", transaction.feeAmount)
                console.log("Message: " + userMessage)
                console.log("Transation ID: " + transaction.id)
        }
    } catch (error) {
        console.error("Error sending transaction:", error);
    }
}
