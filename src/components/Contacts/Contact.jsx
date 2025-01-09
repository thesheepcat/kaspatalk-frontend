import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {Button, Dialog, DialogTitle, Input, Typography} from "@mui/material";
import {
    BothActionsContainerButtonStyle, CancelButtonContainerButtonStyle, ConfirmButtonContainerButtonStyle,
    ListItemShellContainerBoxStyle,
} from "./Contact.styles.js";
import {AddressContainerTypographyStyle, ButtonContainerBoxStyle} from "./ContactList.styles.js";
import {
    CloseButtonContainerButtonStyle,
    ModalButtonsContainerBoxStyle,
    ModalContainerDialogStyle,
    ModalContentContainerBoxStyle, ModalInputContainerInputStyle,
    ModalTitleContainerDialogTitleStyle, SendButtonContainerButtonStyle
} from "../Chat/SidePanel/Header.styles.js";
import { useState} from "react";

const Contact = ({ name, address}) => {
    const [openModal, setOpenModal] = useState(false);
    const [newAlias, setNewAlias] = useState("");
    const [currentName, setCurrentName] = useState(name);
    const [currentAddress] = useState(address);



    const openModalHandler = () => {
        setOpenModal(true);
    };
    const closeModalHandler = () => {
        setOpenModal(false);
        setNewAlias("");

    };
    const saveAliasHandler = () => {
        if (newAlias) {
            try {
                let contacts = JSON.parse(localStorage.getItem("Contacts"));
                if (contacts) {
                    contacts[address] = newAlias;
                } else {
                    contacts = { [address]: newAlias };
                }

                localStorage.setItem('Contacts', JSON.stringify(contacts));

                setCurrentName(newAlias)
                setNewAlias("");

            } catch (error) {
                console.error("Errore durante il salvataggio dei contatti:", error);
            }
        } else {
            alert("Alias can't be empty");
        }


        closeModalHandler();
    }

     const removeAliasHandler = () => {
         const confirmation = window.confirm("Sei sicuro di voler rimuovere questo contatto?");
         if (confirmation) {

             let contacts = JSON.parse(localStorage.getItem("Contacts"));



             if (!contacts) {
                 console.log("Nessun contatto salvato.");
                 return;
             }


             if (contacts[address]) {
                 delete contacts[currentAddress];
                 localStorage.setItem("Contacts", JSON.stringify(contacts));
                 console.log(`Contatto con l'indirizzo ${address} rimosso.`);
                 window.location.reload();
             } else {
                 console.log(`L'indirizzo ${address} non esiste.`);
             }
        }
    }

    return (
        <>
        <ListItem sx={ListItemShellContainerBoxStyle}>
            <Typography component="span" >
                {currentName}
            </Typography>
            <Typography
                component="span"
                sx={{
                    ...AddressContainerTypographyStyle,
                    justifyContent: "flex-start",
                }}
            >
                {currentAddress}
            </Typography>
            <Box sx={ButtonContainerBoxStyle}>

                <Button onClick={openModalHandler}
                        sx={{ ...BothActionsContainerButtonStyle, ...ConfirmButtonContainerButtonStyle }}
                        variant="outlined"
                        size="small">
                    Edit
                </Button>
                <Button sx={{ ...BothActionsContainerButtonStyle, ...CancelButtonContainerButtonStyle }}
                        onClick={removeAliasHandler}
                        variant="outlined"
                        size="small"
                        color="error">
                    Delete
                </Button>
            </Box>
        </ListItem>

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
                            value={address}
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
                            placeholder="Enter Alias for the address"
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
    );
};

export default Contact;