import styles from "./BodyContainer.module.css";
import ChatList from "./ChatList";

const BodyContainer = () => {
    return(
        <div className={styles.BodyContainer}>
            <ChatList/>
        </div>
    );
}

export default BodyContainer;