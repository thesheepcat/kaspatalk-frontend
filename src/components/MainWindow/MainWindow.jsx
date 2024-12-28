import styles from "./MainWindow.module.css";
import ChatContainer from "./ChatContainer.jsx";
import ContentHeader from "./ContentHeader.jsx";
import SendMessageBox from "./SendMessageBox.jsx";
import {useContext} from "react";
import { GeneralContextProvider} from "../contextProviders/GeneralContextProvider.jsx";


const MainWindow = () => {
    const {selectedPeer} = useContext(GeneralContextProvider);
    return(
        <section className={styles.contentArea}>
            <div className={styles.container} >
                {selectedPeer != "" ?
                    <>
                    <ContentHeader />
                    <ChatContainer />
                    <SendMessageBox />   
                    </>
                : <div className={styles.startMessagingAlert}>Select a chat to start messaging</div>
                }
            </div>
        </section>
    )
}

export default MainWindow

/*

          
 

*/
