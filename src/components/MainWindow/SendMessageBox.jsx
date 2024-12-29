import { useContext, useState } from "react";
import styles from "./SendMessageBox.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { GeneralContextProvider} from "../contextProviders/GeneralContextProvider.jsx";
import { sendTransaction } from "../../utils/sendTransaction.js";

const SendMessageBox = () => {
    const {selectedPeer, userPrivKey, networkIdentifier} = useContext(GeneralContextProvider);
    const [ messageText, setMessageText ] = useState("");

    const handleMessageTextChange = (event) => {
        setMessageText(event.target.value)
    }
    
    const handleSendMessageButton = async () => {
        try {
            //console.log("networkIdentifier")
            //console.log(networkIdentifier)
            await sendTransaction(userPrivKey, selectedPeer, messageText, networkIdentifier);
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
                    className={styles.sendButton}
                    onClick={handleSendMessageButton}>
                    <FontAwesomeIcon icon={faPaperPlane} className={styles.sendButtonIcon}/>
                </button>
        </div>
    )
}

export default SendMessageBox;