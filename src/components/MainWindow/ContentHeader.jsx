import styles from "./ContentHeader.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faSearch } from '@fortawesome/free-solid-svg-icons';
import profilePicture1 from "../assets/profile-1.png";
import {useContext} from "react";
import { GeneralContextProvider} from "../contextProviders/GeneralContextProvider.jsx";

const ContentHeader = () => {
    const {selectedPeer} = useContext(GeneralContextProvider);
    
    return(
        <div className={styles.contentHeader}>
                <div className={styles.image}>
                    <img src={profilePicture1} alt="" />
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