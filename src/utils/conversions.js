import { PrivateKey } from "../kaspa-wasm32-sdk/web/kaspa/kaspa.js";
import load from "../kaspa-wasm32-sdk/web/kaspa/kaspa.js";

export const addressFromPrivateKey = async (privateKey, networkId) => {
    try {
        await load(); 
        const privateKeyObject = new PrivateKey(privateKey);
        const userAddressObject = privateKeyObject.toAddress(networkId);
        return userAddressObject.toString()
    } catch (error){
        console.error("Error extracting address from privatekey:", error);
    }
}
