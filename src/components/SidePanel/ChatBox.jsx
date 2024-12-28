import styles from "./ChatBox.module.css";
import profilePicture1 from "../assets/profile-1.png";
import {useContext} from "react";
import { GeneralContextProvider } from "../contextProviders/GeneralContextProvider";

const ChatBox = (peerName) => {
    const {selectedPeer, selectPeer } = useContext(GeneralContextProvider);
    
    const handlePeerClick = (peerName) => {
        selectPeer(peerName);
    }

    const chatBoxClass = selectedPeer == peerName.peerName 
        ? `${styles.ChatBox} ${styles.ChatBoxSelected}` 
        : styles.ChatBox;
    return(
        <div 
            className={chatBoxClass}
            onClick={() => {handlePeerClick(peerName.peerName)}}
            >
                        <div className={styles.ChatImage}>
                            <img className={styles.ChatImageImg} src={profilePicture1} alt=""/>
                        </div>
                        <div className={styles.ChatDetails}>
                            <div className={styles.ChatTitle}>
                                <h3>{peerName.peerName}</h3>
                            </div>
                        </div>
                    </div>
    );
}

export default ChatBox;

/*
<span>06:04 PM</span>
*/