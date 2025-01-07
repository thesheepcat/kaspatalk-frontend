import ChatContainer from "./ChatContainer.jsx";
import ContentHeader from "./ContentHeader.jsx";
import SendMessageBox from "./SendMessageBox.jsx";
import {useContext} from "react";
import {GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx";
import Box from "@mui/material/Box";
import {
    ContainerContainerBoxStyle,
    ContentAreaContainerBoxStyle,
    StartMessagingAlertContainerBoxStyle
} from "./MainWindow.styles.js";


const MainWindow = () => {
    const {selectedPeer} = useContext(GeneralContextProvider);
    return (
        <Box
            sx={ContentAreaContainerBoxStyle}>
            <Box
                sx={ContainerContainerBoxStyle}>
                {selectedPeer != "" ?
                    <>
                        <ContentHeader/>
                        <ChatContainer/>
                        <SendMessageBox/>
                    </>
                    : <Box
                        sx={StartMessagingAlertContainerBoxStyle}>
                        Select a chat to start messaging
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default MainWindow

/*

          
 

*/
