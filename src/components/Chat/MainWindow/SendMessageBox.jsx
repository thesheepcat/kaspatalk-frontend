import { useContext, useState } from "react";
import styles from "./SendMessageBox.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GeneralContext} from "../../ContextProviders/GeneralContextProvider.jsx";
import { UserKeysContext } from "../../ContextProviders/UserKeysContextProvider.jsx";
import { UserSettingsContext } from "../../ContextProviders/UserSettingsContextProvider.jsx";
import { sendTransaction } from "../../../utils/sendTransaction.js";
import { encryptMessage } from "../../../utils/e2ee.js";

const SendMessageBox = () => {
    const { selectedPeer } = useContext(GeneralContext);
    const { userPrivateKey } = useContext(UserKeysContext);
    const { networkIdentifier, kaspaNodeWrpc } = useContext(UserSettingsContext);
    const [ messageText, setMessageText ] = useState("");
    const [ isSendingMessage, setIsSendingMessage ] = useState(false);
    
    const handleMessageTextChange = (event) => {
        setMessageText(event.target.value)
    }
    
    const handleSendMessageButton = async () => {
        if (!messageText.trim()) {
            alert("Please enter a message")
            return;
        }
        try {
            setIsSendingMessage(true);
            const [ encryptedMessage, ivHex ] = await encryptMessage(userPrivateKey, messageText, selectedPeer);
            const encryptedPayload = encryptedMessage + "|" + ivHex;
            await sendTransaction(userPrivateKey, selectedPeer, encryptedPayload, networkIdentifier, kaspaNodeWrpc);
            setIsSendingMessage(false);
            setMessageText("");
        } catch (sendingTransactionError) {
            console.log("sendingTransactionError")
            console.log(sendingTransactionError)
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessageButton();
        }
    }

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
                        onKeyDown={handleKeyDown}
                        />
                    <div className={isSendingMessage ? styles.isSendingMessageIconVisible : styles.isSendingMessageIconHidden}>
                        <FontAwesomeIcon icon={faSpinner} className={isSendingMessage ? styles.spinnerRotating : ''}
                        />
                    </div>
                </div>
                <button 
                    className={styles.sendButton}
                    onClick={handleSendMessageButton}
                    disabled={isSendingMessage}
                >
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.sendButtonIcon}/>
                </button>
        </div>
    )
}

export default SendMessageBox;