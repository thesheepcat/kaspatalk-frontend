import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen"
import styles from "./Header.module.css"
import { useState, useRef, useContext } from "react"
import { GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx"
import { sendTransaction } from "../../../utils/sendTransaction.js";
import { encryptMessage } from "../../../utils/e2ee.js";

const Header = () => {
    const [newPeerAddress, setNewPeerAddress] = useState("");
    const [messageArea, setMessageArea] = useState("");
    const {userPrivKey, networkIdentifier, kaspaNodeWrpc, updateOpenMenuDrawer} = useContext(GeneralContextProvider);
   
    const modalRef = useRef(null);
    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };    
    const closeModal = () => {
        if (modalRef.current) {
            modalRef.current.close();
            setNewPeerAddress("");
            setMessageArea("");
        }
    };

    const handleSendTransactionButton = async (userPrivKey, networkIdentifier, newPeerAddress, messageArea) => {
        try {
            const [ encryptedMessage, ivHex ] = await encryptMessage(userPrivKey, messageArea, newPeerAddress);
            const encryptedPayload = encryptedMessage + "|" + ivHex;
            await sendTransaction(userPrivKey, newPeerAddress, encryptedPayload, networkIdentifier, kaspaNodeWrpc);
            closeModal();
        } catch (sendingTransactionError) {
            console.log("sendingTransactionError")
            console.log(sendingTransactionError)
        }
    };

    return(
        <>
            <div className={styles.sidePanelHeader}>

                <div className={styles.headerButton} onClick={() => updateOpenMenuDrawer(true)}>
                    <FontAwesomeIcon icon={faBars} className={styles.headerButtonIcon} />
                </div>
                <div className={styles.searchBox}>
                    <FontAwesomeIcon icon={faSearch} className={styles.searchBoxIcon}/>
                    <input type="text" placeholder="Search" className={styles.searchBoxInput}></input>
                </div>
                <div className={styles.headerButton} onClick={openModal}>
                    <FontAwesomeIcon icon={faPen} className={styles.headerButtonIcon} />
                </div>
            </div>
             {/* Start new conversation Modal Dialog */}
            <dialog ref={modalRef} className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2 className={styles.modalTitle} >Start a new conversation</h2>
                    <div>
                        <label>New Peer Address:</label>
                        <input
                            type="text"
                            id="newPeerAddress"
                            value={newPeerAddress}
                            onChange={(event) => setNewPeerAddress(event.target.value)}
                            placeholder="Enter new peer address"
                            className={styles.modalInput}
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                            id="messageArea"
                            value={messageArea}
                            onChange={(event) => setMessageArea(event.target.value)}
                            placeholder="Write your message"
                            className={styles.modalTextArea}
                        />
                    </div>
                    <div className={styles.modalButtons}>
                        <button onClick={() => handleSendTransactionButton(userPrivKey, networkIdentifier, newPeerAddress, messageArea)} className={styles.sendButton}>
                            Send Message
                        </button>
                        <button onClick={closeModal} className={styles.closeButton}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>   
        </>
    )
}

export default Header


//<Button onClick={toggleDrawer(true)}>Open drawer</Button>