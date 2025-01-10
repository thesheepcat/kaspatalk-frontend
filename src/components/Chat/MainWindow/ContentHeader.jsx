
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { GeneralContextProvider } from "../../ContextProviders/GeneralContextProvider.jsx";
import { toSvg } from "jdenticon";
import Box from "@mui/material/Box";
import {Button, Dialog, DialogTitle, IconButton, ImageListItem, Input, Typography} from "@mui/material";
import {
    ContentHeaderContainerBoxStyle,
    DetailsContainerBoxStyle,
    DetailsSpanContainerTypographyStyle,
    DetailsTitleContainerTypographyStyle,
    IconsContainerBoxStyle,
    ImageContainerBoxStyle,
    ImageContainerImageStyle
} from "./ContentHeader.styles.js";
import {
    CloseButtonContainerButtonStyle,
    ModalButtonsContainerBoxStyle,
    ModalContainerDialogStyle,
    ModalContentContainerBoxStyle, ModalInputContainerInputStyle,
    ModalTitleContainerDialogTitleStyle, SendButtonContainerButtonStyle
} from "../SidePanel/Header.styles.js";
import {checkObjectInDb, getKeyValueFromDbObject, getObjectFromDb, storeObjectInDb} from "../../../storage/storage.js";

const ContentHeader = () => {
    const { selectedPeer } = useContext(GeneralContextProvider);
    const [ peerImage, setPeerImage] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [newAlias, setNewAlias] = useState("");
    
    // Dynamically create peer image
    useEffect(() => {
        const imageFromSelectedPeerName = toSvg(selectedPeer, 100);
        //console.log(imageFromSelectedPeerName);
        const encodedSvg = encodeURIComponent(imageFromSelectedPeerName);
        const imageDataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
        setPeerImage(imageDataUrl);
    }, [selectedPeer])


    const openModalHandler = () => {
        setOpenModal(true);
    };
    const closeModalHandler = () => {
        setOpenModal(false);
        setNewAlias("");

    };
    const saveAliasHandler = async () => {
        if (newAlias) {
            let contacts = getObjectFromDb("Contacts")
            if (contacts) {
                contacts[selectedPeer] = newAlias;
            } else {
                contacts = {[selectedPeer]: newAlias};
            }
            storeObjectInDb("Contacts", contacts);
            setNewAlias("");
        }
         else {
            alert("Alias can't be empty");
        }
        closeModalHandler();
    }
    const checkifAlias = () => {

        if (checkObjectInDb("Contacts", selectedPeer)){
            return getKeyValueFromDbObject("Contacts", selectedPeer);
        }
        return ""

    };


    return(
        <>
        <Box
             sx={ContentHeaderContainerBoxStyle}>
                <Box
                    sx={ImageContainerBoxStyle}>
                    <ImageListItem
                        sx={ImageContainerImageStyle}>
                        <img src={peerImage} alt="peerImage" />
                    </ImageListItem>

                </Box>
                <Box
                    sx={DetailsContainerBoxStyle}>
                    <Typography component={"span"}
                                sx={DetailsTitleContainerTypographyStyle}
                    >{checkifAlias()}</Typography>
                    <Typography component={"span"}
                                sx={DetailsTitleContainerTypographyStyle}
                    >{selectedPeer}</Typography>
                    <Typography component={"span"}
                                sx={DetailsSpanContainerTypographyStyle}
                                >last seen 10 minutes ago</Typography>

                </Box>
                <Box
                     sx={IconsContainerBoxStyle}>
                    <FontAwesomeIcon icon={faSearch} />
                    <IconButton onClick={openModalHandler}>
                        <FontAwesomeIcon icon={faEllipsisV}/>
                    </IconButton>
                </Box>
        </Box>
            <Dialog open={openModal}
                    onClose={closeModalHandler}
                    slotProps={{
                        backdrop: {
                            sx: {
                                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                            },
                        },

                    }}

                    sx={ModalContainerDialogStyle}>
                <Box  sx={ModalContentContainerBoxStyle} >
                    <DialogTitle sx={ModalTitleContainerDialogTitleStyle}>Save Address</DialogTitle>

                    <Box>
                        <label>Address</label>
                        <Input
                            type="text"
                            value={selectedPeer}
                            disabled={true}
                            sx={ModalInputContainerInputStyle}
                            disableUnderline={true}
                        />
                    </Box>
                    <Box>
                        <label>New Alias:</label>
                        <Input
                            type="text"
                            id="newAlias"
                            value={newAlias}
                            onChange={(event) => setNewAlias(event.target.value)}
                            placeholder={checkObjectInDb("Contacts", selectedPeer)? getKeyValueFromDbObject("Contacts", selectedPeer):"Enter Alias for the address"}
                            sx={ModalInputContainerInputStyle}
                            disableUnderline={true}
                        />
                    </Box>

                    <Box sx={ModalButtonsContainerBoxStyle} >
                        <Button
                            onClick={() => {saveAliasHandler()}}

                            sx={SendButtonContainerButtonStyle}>

                            Save
                        </Button>
                        <Button onClick={closeModalHandler}
                                sx={CloseButtonContainerButtonStyle}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default ContentHeader