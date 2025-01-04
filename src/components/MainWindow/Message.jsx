import PropTypes from 'prop-types';
import styles from "./Message.module.css"
import { useState, useEffect, useContext } from "react"; 
import { decryptMessage } from "../../utils/e2ee.js";
import { GeneralContextProvider } from "../ContextProviders/GeneralContextProvider.jsx";

const Message = ({isReceivedMessage, encryptedPayload, timestamp}) => {
    const { userPrivKey, selectedPeer } = useContext(GeneralContextProvider); 
    const [ decryptedMessage, setDecryptedMessage ] = useState();

    // Decrypt message
    useEffect(() => {
        try {
            const [ encryptedMessage, ivHex ] = encryptedPayload.split("|");
            setDecryptedMessage(decryptMessage(userPrivKey, encryptedMessage, ivHex, selectedPeer));
        } catch (error) {
            console.log("Error while decrypting message: ", error);
        }
    },[encryptedPayload]);

    return (
        <div className={isReceivedMessage == true ? styles.receivedMessage : styles.sentMessage}>
                <span className={styles.messageText}>{decryptedMessage} </span>
            <span className={styles.messageTime}>{new Date(timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })}</span>
        </div>
    )
}

export default Message

Message.propTypes = {
    isReceivedMessage: PropTypes.bool.isRequired,
    encryptedPayload: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
};