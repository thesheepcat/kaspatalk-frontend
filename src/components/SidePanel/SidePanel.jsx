import Header from "./Header";
import styles from "./SidePanel.module.css";
import BodyContainer from "./BodyContainer";

const SidePanel = () => {
    
    
    return(
        <aside className={styles.sidePanel} >
            <Header />
            <BodyContainer />
        </aside>
    )
}

export default SidePanel;