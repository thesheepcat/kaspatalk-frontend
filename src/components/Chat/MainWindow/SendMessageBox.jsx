import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx";
import { sendTransaction } from "../../../utils/sendTransaction.js";
import { encryptMessage } from "../../../utils/e2ee.js";
import Box from "@mui/material/Box";
import {Button, IconButton, styled} from "@mui/material";
import { keyframes } from '@emotion/react';
import {
    EmojiButtonContainerBoxStyle,
    EmojiButtonIconContainerIconButtonStyle,
    IsSendingMessageIconHiddenContainerIconButtonStyle,
    IsSendingMessageIconVisibleContainerIconButtonStyle,
    MessageBoxContainerBoxStyle,
    MessageContentContainerBoxStyle,
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
                <Box className={"styles.messageContent"} sx={MessageContentContainerBoxStyle}>
                    <Box className={"styles.emojiButton"} sx={EmojiButtonContainerBoxStyle}>
                        <StyledFontAwesomeIcon icon={faFaceSmile} className={"styles.emojiButtonIcon"} sx={EmojiButtonIconContainerIconButtonStyle}/>
                    </Box>
                    <textarea
                        style={{
                            height: '2rem',
                            fontSize: '1.2rem',
                            width: '100%',
                            padding: '0.5rem',
                            outline: 'none',
                            border: 'none',
                            fontFamily: 'system-ui',
                            overflowWrap: 'break-word',
                            resize: 'none',
                            overflow: 'hidden'
                        }}
                        placeholder="Write your message here..."
                        value={messageText}
                        onChange={handleMessageTextChange}
                        onKeyDown={handleKeyDown}
                    />
                    <IconButton
                        className={"isSendingMessage ? styles.isSendingMessageIconVisible : styles.isSendingMessageIconHidden"}
                        sx={{...sendingMessageMarker(isSendingMessage)}}>
                        <FontAwesomeIcon
                            icon={faSpinner}
                            style={{animation: isSendingMessage ? {spin}+' 1s linear infinite' : ''}}/>
                    </IconButton>
                </Box>
                <Button
                    className={"styles.sendButton"}
                    sx={SendButtonContainerButtonStyle}
                    onClick={handleSendMessageButton}
                    disabled={isSendingMessage}
                >
                        <StyledFontAwesomeIcon
                            icon={faPaperPlane}
                            className={"styles.sendButtonIcon"}
                            sx={SendButtonIconContainerIconButtonStyle}/>

                </Button>
        </Box>
    )
}

export default SendMessageBox;