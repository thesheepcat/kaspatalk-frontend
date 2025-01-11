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
import {checkObjectInDb, getKeyValueFromDbObject} from "../../../storage/storage.js";


const ChatBox = (peerName) => {
    const [ trimmedPeerName, setTrimmedPeerName] = useState();
    const { selectedPeer, selectPeer } = useContext(GeneralContextProvider);
    const [ peerImage, setPeerImage] = useState();
    const isSmallScreen = useMediaQuery("(max-width:1070px)");
    const [newAlias, setNewAlias] = useState("");
        
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


    const chatBoxClass =(selectedPeer) => {
        if(selectedPeer === peerName.peerName){
            return SelectedChatBoxContainerBoxStyle
        }
    }
    useEffect(() => {
        checkObjectInDb("Contacts", peerName.peerName) ? setNewAlias(getKeyValueFromDbObject("Contacts", peerName.peerName)):setNewAlias("")

    },[newAlias])

    document.addEventListener("newAlias",(event) =>{
        console.log(event.detail.address);
        console.log(peerName.peerName);
        if (event.detail.address === peerName.peerName){

        setNewAlias(event.detail.alias);
    }})


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
                         <Typography variant="h3" sx={BothH3TitleAndChatTileStyle}>{newAlias}</Typography>
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