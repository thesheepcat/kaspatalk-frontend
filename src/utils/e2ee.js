
import { payToAddressScript, Address} from "../kaspa-wasm32-sdk/web/kaspa/kaspa.js";
import elliptic from "elliptic";
import CryptoJS from 'crypto-js';

// Derive Public Key from address
const derivePublicKeyFromScriptPublicKey = (scriptPublicKey) => {
    const scriptFromAddress = scriptPublicKey.script;
    //console.log("scriptFromAddress")
    //console.log(scriptFromAddress)
    const derivedPublicKey = scriptFromAddress.slice(2, -2);
    const formattedPublicKey = "02" + derivedPublicKey;
    //console.log("formattedPublicKey");
    //console.log(formattedPublicKey);
    return formattedPublicKey;
}

// ECDH Key Exchange to derive a shared secret
const deriveSharedSecret = (privateKey, publicKey, ec) => {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const peerPublicKey = ec.keyFromPublic(publicKey, 'hex');
    // ECDH key agreement: derive shared secret
    const sharedSecret = key.derive(peerPublicKey.getPublic()).toString(16);
    return sharedSecret;
}
  
// Generate symmetric key from shared secret (this is a basic key derivation using SHA256)
const deriveSymmetricKey = (sharedSecret) => {
    return CryptoJS.SHA256(sharedSecret).toString(CryptoJS.enc.Hex);
}
  
// Encrypt the message using the derived symmetric key (AES-CBC)
const getEncryptedMessage = (message, symmetricKey) => {
    const iv = CryptoJS.lib.WordArray.random(16); // 16-byte random IV
    const encryptedMessage = CryptoJS.AES.encrypt(message, symmetricKey, { iv }).toString();
    return { encryptedMessage, iv: iv.toString() };
}
  
// Decrypt the message using the derived symmetric key (AES-CBC)
const getDecryptedMessage = (encryptedMessage, iv, symmetricKey) => {
    const decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, symmetricKey, { iv: CryptoJS.enc.Hex.parse(iv) });
    return decryptedMessage.toString(CryptoJS.enc.Utf8);
}

// Encrypt message using User_1 privateKey and User_2 address
export const encryptMessage = (privateKey, messageText, address) => {
    const ec = new elliptic.ec('secp256k1');
    try {
        const peerAddress = new Address(address);
        const scriptPublicKey = payToAddressScript(peerAddress);
        const publicKey = derivePublicKeyFromScriptPublicKey(scriptPublicKey);        
        const sharedSecret = deriveSharedSecret(privateKey, publicKey, ec);
        //console.log('Shared Secret:', sharedSecret);
        const symmetricKey = deriveSymmetricKey(sharedSecret);
        const { encryptedMessage: encryptedMessageText, iv } = getEncryptedMessage(messageText, symmetricKey);
        //console.log('Encrypted Message:', encryptedMessageText);
        //console.log('IV:', iv);
        return [encryptedMessageText, iv];
    } catch (error) {
        console.log("Error on message encryption: ", error);
    }
}

// Decrypt encryptedMessage using receiver privateKey, sender address and iv
export const decryptMessage = (privateKey, encryptedMessageText, ivHexString, address) => {
    // Set up secp256k1 curve using elliptic library
    const ec = new elliptic.ec('secp256k1');
    try {
        const peerAddress = new Address(address);
        const scriptPublicKey = payToAddressScript(peerAddress);
        const publicKey = derivePublicKeyFromScriptPublicKey(scriptPublicKey);
        const sharedSecret = deriveSharedSecret(privateKey, publicKey, ec);
        //console.log('Shared Secret:', sharedSecret);        
        const symmetricKey = deriveSymmetricKey(sharedSecret);
        const decryptedMessage = getDecryptedMessage(encryptedMessageText, ivHexString, symmetricKey);
        //console.log('Decrypted Message:', decryptedMessage);
        return decryptedMessage
    } catch (error) {
        console.log("Error on message decryption: ", error)
    }
}