import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faSearch, faPen} from '@fortawesome/free-solid-svg-icons'
import {useState, useContext} from "react"
import {GeneralContextProvider} from "../../ContextProviders/GeneralContextProvider.jsx"
import {sendTransaction} from "../../../utils/sendTransaction.js";
import {encryptMessage} from "../../../utils/e2ee.js";
import Box from "@mui/material/Box";
import {Button, Dialog, DialogTitle, Input, styled} from "@mui/material";
import theme from "../../../index.theme.js";
import {
    CloseButtonContainerButtonStyle,
    HeaderButtonContainerBoxStyle,
    HeaderButtonContainerStyledFontAwesomeIconStyle, ModalButtonsContainerBoxStyle,
    ModalContainerDialogStyle,
    ModalContentContainerBoxStyle, ModalInputContainerInputStyle,
    ModalTitleContainerDialogTitleStyle,
    SearchBoxContainerBoxStyle,
    SearchBoxIconContainerStyledFontAwesomeIconStyle,
    SearchBoxInputContainerInputStyle, SendButtonContainerButtonStyle,
    SidePanelHeaderContainerBoxStyle
} from "./Header.styles.js";

const Header = () => {
    const [newPeerAddress, setNewPeerAddress] = useState("");
    const [messageArea, setMessageArea] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const {userPrivKey, networkIdentifier, kaspaNodeWrpc, updateOpenMenuDrawer} = useContext(GeneralContextProvider);
    const StyledFontAwesomeIcon = styled(FontAwesomeIcon)({theme})


    const openModalHandler = () => {
        setOpenModal(true);
    };


    const closeModalHandler = () => {
        setOpenModal(false);
        setNewPeerAddress("");  // Reset dei campi del modale
        setMessageArea("");
    };

    const handleSendTransactionButton = async (userPrivKey, networkIdentifier, newPeerAddress, messageArea) => {
        try {
            const [encryptedMessage, ivHex] = await encryptMessage(userPrivKey, messageArea, newPeerAddress);
            const encryptedPayload = encryptedMessage + "|" + ivHex;
            await sendTransaction(userPrivKey, newPeerAddress, encryptedPayload, networkIdentifier, kaspaNodeWrpc);
            closeModalHandler();
        } catch (sendingTransactionError) {
            console.log("sendingTransactionError")
            console.log(sendingTransactionError)
        }
    };

    return (
        <>
            <Box className={"styles.sidePanelHeader"}
                 sx={SidePanelHeaderContainerBoxStyle}>

                <Box className={"styles.headerButton"}
                     sx={HeaderButtonContainerBoxStyle}
                     onClick={() => updateOpenMenuDrawer(true)}>

                    <StyledFontAwesomeIcon icon={faBars}
                                           className={"styles.headerButtonIcon"}
                                           sx={HeaderButtonContainerStyledFontAwesomeIconStyle}/>
                </Box>
                <Box className={"styles.searchBox"}
                     sx={SearchBoxContainerBoxStyle}>
                    <StyledFontAwesomeIcon icon={faSearch}
                                           className={"styles.searchBoxIcon"}
                                           sx={SearchBoxIconContainerStyledFontAwesomeIconStyle}/>
                    <Input type="text"
                           placeholder="Search"
                           className={"styles.searchBoxInput"}
                           sx={SearchBoxInputContainerInputStyle}></Input>
                </Box>
                <Box className={"styles.headerButton"}
                     sx={HeaderButtonContainerBoxStyle}
                     onClick={openModalHandler}>
                    <StyledFontAwesomeIcon icon={faPen}
                                           sx={HeaderButtonContainerStyledFontAwesomeIconStyle}
                                           className={"styles.headerButtonIcon"}/>
                </Box>
            </Box>
            {/* Start new conversation Modal Dialog */}
            <Dialog open={openModal}
                    onClose={closeModalHandler}
                    slotProps={{
                        backdrop: {
                            sx: {
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                            },
                        },
                    }}
                    sx={ModalContainerDialogStyle}>
                <Box className={"styles.modalContent"} sx={ModalContentContainerBoxStyle}>
                    <DialogTitle className={"styles.modalTitle"} sx={ModalTitleContainerDialogTitleStyle}>Start a new conversation</DialogTitle>
                    <Box>
                        <label>New Peer Address:</label>
                        <Input
                            type="text"
                            id="newPeerAddress"
                            value={newPeerAddress}
                            onChange={(event) => setNewPeerAddress(event.target.value)}
                            placeholder="Enter new peer address"
                            className={"styles.modalInput"}
                            sx={ModalInputContainerInputStyle}
                        />
                    </Box>
                    <Box>
                        <label>Message:</label>
                        <Input
                            type="text"
                            id="messageArea"
                            value={messageArea}
                            onChange={(event) => setMessageArea(event.target.value)}
                            placeholder="Write your message"
                            className={"styles.modalTextArea"}
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}

                        />
                    </Box>
                    <Box className={"styles.modalButtons"} sx={ModalButtonsContainerBoxStyle}>
                        <Button
                            onClick={() => handleSendTransactionButton(userPrivKey, networkIdentifier, newPeerAddress, messageArea)}
                            className={"styles.sendButton"}
                            sx={SendButtonContainerButtonStyle}>

                            Send
                        </Button>
                        <Button onClick={closeModalHandler} className={"styles.closeButton"} sx={CloseButtonContainerButtonStyle}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    );
};

export default Header;