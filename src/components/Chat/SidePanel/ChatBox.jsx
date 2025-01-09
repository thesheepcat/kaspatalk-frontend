import {useContext, useEffect, useState} from "react";
import { GeneralContextProvider } from "../../ContextProviders/GeneralContextProvider";
import { toSvg } from "jdenticon";
import {Box, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import {
    BothH3TitleAndChatTileStyle,
    ChatBoxContainerBoxStyle,
    ChatDetailsContainerBoxStyle,
    ChatImageBigScreenContainerImageListItemStyle,
    ChatImageContainerBoxStyle,
    ChatImageSmallScreenContainerImageListItemStyle, ChatTitleContainerBoxStyle,
    SelectedChatBoxContainerBoxStyle
} from "./ChatBox.styles.js";


const ChatBox = (peerName) => {
    const [ trimmedPeerName, setTrimmedPeerName] = useState();
    const { selectedPeer, selectPeer } = useContext(GeneralContextProvider);
    const [ peerImage, setPeerImage] = useState();
    const isSmallScreen = useMediaQuery("(max-width:1070px)");
        
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
        if (localStorage.getItem(peerName.peerName.toString()) !== null){
            let name = localStorage.getItem(peerName.peerName.toString())
            setTrimmedPeerName(name)
        }
        else {
            let parts = completePeerName.peerName.split(':');
            let firstPart = parts[0];
            let secondPart = parts[1];
            let start = secondPart.slice(0, 6);
            let end = secondPart.slice(-6);
            setTrimmedPeerName(firstPart + ":" + start + "..." + end)
        }



    }
    useEffect(() => {
        trimPeerName(peerName);
        createProfileImage(peerName);

    }, [peerName])


    const chatBoxClass =(selectedPeer) => {
        if(selectedPeer === peerName.peerName){
            return SelectedChatBoxContainerBoxStyle
        }
    }



    return(

        <Box
            sx={{...ChatBoxContainerBoxStyle, ...chatBoxClass(selectedPeer)}}
            onClick={() => {handlePeerClick(peerName.peerName)}}>
            {isSmallScreen ? (
                //small screen visualization
                <>
                    <Box>
                        <ImageListItem sx={ChatImageSmallScreenContainerImageListItemStyle}>
                            <img  src={peerImage} alt=""/>
                        </ImageListItem>

                    </Box>
                </>
            ) : (

                //big screen configuration (same as before)
                <>
                    <Box  sx={ChatImageContainerBoxStyle}>
                        <ImageListItem sx={ChatImageBigScreenContainerImageListItemStyle}>
                                <img  src={peerImage} alt=""/>
                        </ImageListItem>
                    </Box>
                    <Box  sx={ChatDetailsContainerBoxStyle}>
                     <Box  sx={{...ChatTitleContainerBoxStyle,...BothH3TitleAndChatTileStyle}}>
                         <Typography variant="h3" sx={BothH3TitleAndChatTileStyle}>{trimmedPeerName}</Typography>
                     </Box>
                    </Box>
                </>
            )}
        </Box>
    );
}

export default ChatBox;

/*
<span>06:04 PM</span>
*/