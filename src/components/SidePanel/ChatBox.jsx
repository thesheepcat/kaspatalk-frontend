import styles from "./ChatBox.module.css";
import {useContext, useEffect, useState} from "react";
import { GeneralContextProvider } from "../ContextProviders/GeneralContextProvider";
import { toSvg } from "jdenticon";

const ChatBox = (peerName) => {
    const [ trimmedPeerName, setTrimmedPeerName] = useState();
    const { selectedPeer, selectPeer } = useContext(GeneralContextProvider);
    const [ peerImage, setPeerImage] = useState();
        
    // Dynamically create peer image
    const createProfileImage = (peerName) => {
        const imageFromPeerName = toSvg(peerName.peerName, 100);
        const encodedSvg = encodeURIComponent(imageFromPeerName);
        const imageDataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
        setPeerImage(imageDataUrl);
    }
    
    // Handle peer selection from chat list
    const handlePeerClick = (peerName) => {
        selectPeer(peerName);
    }

    const trimPeerName = (completePeerName) => {
        // Split the string at the colon to separate the part before and after
        let parts = completePeerName.peerName.split(':');
        let firstPart = parts[0];
        let secondPart = parts[1];
        let start = secondPart.slice(0, 6);
        let end = secondPart.slice(-6);
        setTrimmedPeerName(firstPart + ":" + start + "..." + end)
    }
    useEffect(() => {
        trimPeerName(peerName);
        createProfileImage(peerName);
    }, [peerName])


    const chatBoxClass = selectedPeer == peerName.peerName ? `${styles.ChatBox} ${styles.ChatBoxSelected}` : styles.ChatBox;
    return(
        <div className={chatBoxClass} onClick={() => {handlePeerClick(peerName.peerName)}}>
                        <div className={styles.ChatImage}>
                            <img className={styles.ChatImageImg} src={peerImage} alt=""/>
                        </div>
                        <div className={styles.ChatDetails}>
                            <div className={styles.ChatTitle}>
                                <h3>{trimmedPeerName}</h3>
                            </div>
                        </div>
                    </div>
    );
}

export default ChatBox;

/*
<span>06:04 PM</span>
*/