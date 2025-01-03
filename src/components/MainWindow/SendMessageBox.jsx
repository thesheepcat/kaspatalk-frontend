import { useContext, useState } from "react";
import styles from "./SendMessageBox.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GeneralContextProvider} from "../ContextProviders/GeneralContextProvider.jsx";
import { sendTransaction } from "../../utils/sendTransaction.js";
import { encryptMessage } from "../../utils/e2ee.js";

const SendMessageBox = () => {
    const { selectedPeer, userPrivKey, networkIdentifier, kaspaNodeWrpc } = useContext(GeneralContextProvider);
    const [ messageText, setMessageText ] = useState("");
    const [ isSendingMessage, setIsSendingMessage ] = useState(false);
    
    const handleMessageTextChange = (event) => {
        setMessageText(event.target.value)
    }
    
    const handleSendMessageButton = async () => {
        try {
            setIsSendingMessage(true);
            const [ encryptedMessage, ivHex ] = await encryptMessage(userPrivKey, messageText, selectedPeer);
            const encryptedPayload = encryptedMessage + "|" + ivHex;
            await sendTransaction(userPrivKey, selectedPeer, encryptedPayload, networkIdentifier, kaspaNodeWrpc);
            setIsSendingMessage(false);
            setMessageText("");
        } catch (sendingTransactionError) {
            console.log("sendingTransactionError")
            console.log(sendingTransactionError)
        }
    };

    return(
        <div className={styles.messageBox}>
                <div className={styles.messageContent}>
                    <div className={styles.emojiButton}>
                        <FontAwesomeIcon icon={faFaceSmile} className={styles.emojiButtonIcon} />  
                    </div>
                    <textarea 
                        type="text" 
                        placeholder="Write your message here..."
                        value={messageText}
                        className={styles.messageInput}
                        onChange={handleMessageTextChange}
                        />
                </div>
                <button 
                    className={isSendingMessage ? styles.sendButtonWhileSending : styles.sendButton}
                    onClick={handleSendMessageButton}>
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.sendButtonIcon}/>
                </button>
        </div>
    )
}

export default SendMessageBox;