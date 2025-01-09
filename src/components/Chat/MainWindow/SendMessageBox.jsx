import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx";
import { sendTransaction } from "../../../utils/sendTransaction.js";
import { encryptMessage } from "../../../utils/e2ee.js";
import Box from "@mui/material/Box";
import {Button, IconButton, Input, styled} from "@mui/material";
import { keyframes } from '@emotion/react';
import {
    EmojiButtonContainerBoxStyle,
    EmojiButtonIconContainerIconButtonStyle,
    IsSendingMessageIconHiddenContainerIconButtonStyle,
    IsSendingMessageIconVisibleContainerIconButtonStyle,
    MessageBoxContainerBoxStyle,
    MessageContentContainerBoxStyle, MessageInputContainerTextAreaAutosizeStyle,
    SendButtonContainerButtonStyle, SendButtonIconContainerIconButtonStyle
} from "./SendMessageBox.styles.js";
import theme from "../../../index.theme.js";

const SendMessageBox = () => {
    const { selectedPeer, userPrivKey, networkIdentifier, kaspaNodeWrpc } = useContext(GeneralContextProvider);
    const [ messageText, setMessageText ] = useState("");
    const [ isSendingMessage, setIsSendingMessage ] = useState(false);
    const spin = keyframes`
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
        `;

    const StyledFontAwesomeIcon = styled(FontAwesomeIcon)({theme})


    const handleMessageTextChange = (event) => {
        setMessageText(event.target.value)
    }
    
    const handleSendMessageButton = async () => {
        if (!messageText.trim()) {
            alert("Please enter a message")
            return;
        }
        try {
            setIsSendingMessage(true);
            const [ encryptedMessage, ivHex ] = await encryptMessage(userPrivKey, messageText, selectedPeer);
            const encryptedPayload = encryptedMessage + "|" + ivHex;
            await sendTransaction(userPrivKey, selectedPeer, encryptedPayload, networkIdentifier, kaspaNodeWrpc);
            setIsSendingMessage(false);
            setMessageText("");
        } catch (sendingTransactionError) {
            console.log("sendingTransactionError")
            console.log(sendingTransactionError)
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessageButton();
        }
    }
    const sendingMessageMarker=(isSendingMessage)=> {
        if (isSendingMessage) {
            return IsSendingMessageIconVisibleContainerIconButtonStyle;
        }
        return IsSendingMessageIconHiddenContainerIconButtonStyle
    }

    return(
        <Box className={"styles.messageBox"} sx={MessageBoxContainerBoxStyle}>
                <Box  sx={MessageContentContainerBoxStyle}>
                    <Box  sx={EmojiButtonContainerBoxStyle}>
                        <StyledFontAwesomeIcon icon={faFaceSmile}  sx={EmojiButtonIconContainerIconButtonStyle}/>
                    </Box>
                    <Input type={"text"}
                        sx={MessageInputContainerTextAreaAutosizeStyle}
                        placeholder="Write your message here..."
                        value={messageText}
                       disableUnderline={true}
                        onChange={handleMessageTextChange}
                        onKeyDown={handleKeyDown}
                       margin="dense"
                       multiline
                       maxRows={3}

                    />
                    <IconButton
                        sx={{...sendingMessageMarker(isSendingMessage), flexAlign: 'flex-end' }}>
                        <FontAwesomeIcon
                            icon={faSpinner}
                            style={{animation: isSendingMessage ? {spin}+' 1s linear infinite' : ''}}/>
                    </IconButton>
                </Box>
                <Button
                    sx={SendButtonContainerButtonStyle}
                    onClick={handleSendMessageButton}
                    disabled={isSendingMessage}
                >
                        <StyledFontAwesomeIcon
                            icon={faPaperPlane}
                            sx={SendButtonIconContainerIconButtonStyle}/>

                </Button>
        </Box>
    )
}

export default SendMessageBox;