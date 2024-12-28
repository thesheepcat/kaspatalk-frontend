import styles from "./Header.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return(
                <div className={styles.sidePanelHeader}>
                    <div className={styles.toggleButton}>
                        <FontAwesomeIcon icon={faBars} className={styles.toggleButtonIcon} />
                    </div>
                    <div className={styles.searchBox}>
                        <FontAwesomeIcon icon={faSearch} className={styles.searchBoxIcon}/>
                        <input type="text" placeholder="Search" className={styles.searchBoxInput}></input>
                    </div>
                </div>
    )
}

export default Header


