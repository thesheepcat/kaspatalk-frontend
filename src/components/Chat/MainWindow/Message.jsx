import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from "react"; 
import { decryptMessage } from "../../../utils/e2ee.js";
import { GeneralContextProvider } from "../../ContextProviders/GeneralContextProvider.jsx";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {
    BothMessagesStyle,
    MessageTextContainerTypographyStyle,
    MessageTimeContainerTypographyStyle, ReceivedMessageContainerBoxStyle, SentMessageContainerBoxStyle
} from "./Message.styles.js";

const Message = ({isReceivedMessage, encryptedPayload, timestamp}) => {
    const { userPrivKey, selectedPeer } = useContext(GeneralContextProvider); 
    const [ decryptedMessage, setDecryptedMessage ] = useState();
    const MessageStyleDetector = (isReceivedMessage) =>{
        if (isReceivedMessage) {
            return ReceivedMessageContainerBoxStyle;
        }
        return SentMessageContainerBoxStyle;
    }

    // Decrypt message
    useEffect(() => {
        try {
            const [ encryptedMessage, ivHex ] = encryptedPayload.split("|");
            setDecryptedMessage(decryptMessage(userPrivKey, encryptedMessage, ivHex, selectedPeer));
        } catch (error) {
            console.log("Error while decrypting message: ", error);
        }
    },[encryptedPayload]);

    return (
        <Box className={"ff"}
            sx ={
                {
                    ...BothMessagesStyle,
                    ...MessageStyleDetector(isReceivedMessage),
                }
            }>
                <Typography component={"span"}
                            sx={MessageTextContainerTypographyStyle}>
                    {decryptedMessage} </Typography>

            <Typography component={"span"}
                        sx={MessageTimeContainerTypographyStyle}>
                {new Date(timestamp).toLocaleTimeString([],
                    {
                    hour: '2-digit',
                    minute: '2-digit'
                    }
            )}</Typography>
        </Box>
    )
}

export default Message

Message.propTypes = {
    isReceivedMessage: PropTypes.bool.isRequired,
    encryptedPayload: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired
};