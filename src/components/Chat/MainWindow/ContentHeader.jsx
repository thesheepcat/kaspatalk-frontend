import styles from "./ContentHeader.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../ContextProviders/GeneralContextProvider.jsx";
import { toSvg } from "jdenticon";

const ContentHeader = () => {
    const { selectedPeer } = useContext(GeneralContext);
    const [ peerImage, setPeerImage] = useState();
    
    // Dynamically create peer image
    useEffect(() => {
        const imageFromSelectedPeerName = toSvg(selectedPeer, 100);
        //console.log(imageFromSelectedPeerName);
        const encodedSvg = encodeURIComponent(imageFromSelectedPeerName);
        const imageDataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
        setPeerImage(imageDataUrl);
    }, [selectedPeer])

    return(
        <div className={styles.contentHeader}>
                <div className={styles.image}>
                    <img src={peerImage} alt="" />
                </div>
                <div className= {styles.details}>
                    <span className={styles.detailsTitle}>{selectedPeer}</span>
                    <span className={styles.detailsSpan}>last seen 10 minutes ago</span>
                </div>
                <div className={styles.icons}>
                    <FontAwesomeIcon icon={faSearch} className={styles.toggleButtonIcon} />
                    <FontAwesomeIcon icon={faEllipsisV} className={styles.toggleButtonIcon} />      
                </div>
        </div>
    )
}

export default ContentHeader