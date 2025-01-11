import { ConsoleConstructorOptions, PrivateKey } from "../kaspa-wasm32-sdk/web/kaspa/kaspa.js";

export const getAddressFromPrivateKey = (privateKey, networkId) => {
    try {
        const privateKeyObject = new PrivateKey(privateKey);
        const userAddressObject = privateKeyObject.toAddress(networkId);
        return userAddressObject.toString()
    } catch (error){
        //console.error("Error extracting address from privatekey:", error);
    }
}
