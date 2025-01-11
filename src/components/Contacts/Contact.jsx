
import Box from "@mui/material/Box";
import {Button, Checkbox, Dialog, DialogTitle, Input} from "@mui/material";
import {
    BothActionsContainerButtonStyle, ButtonContainerBoxStyle,
    //CancelButtonContainerButtonStyle,
    ConfirmButtonContainerButtonStyle,

} from "./Contact.styles.js";

import {
    CloseButtonContainerButtonStyle,
    ModalButtonsContainerBoxStyle,
    ModalContainerDialogStyle,
    ModalContentContainerBoxStyle,
    ModalInputContainerInputStyle,
    ModalTitleContainerDialogTitleStyle,
    SendButtonContainerButtonStyle
} from "../Chat/SidePanel/Header.styles.js";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {checkObjectInDb, getKeyValueFromDbObject} from "../../storage/storage.js";



const Contact = ({ name, address, isChecked,  onSelect }) => {
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
                setCurrentName(newAlias);
                setNewAlias("");
            } catch (error) {
                console.error("Errore durante il salvataggio dei contatti:", error);
            }
        } else {
            alert("Alias can't be empty");
        }

        closeModalHandler();
    };



    return (
        <TableRow>
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isChecked}
                    onChange={() => onSelect(address)}
                    inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${address}` }}
                />
            </TableCell>
            <TableCell component="th" scope="row">{currentName}</TableCell>
            <TableCell align="left">{currentAddress}</TableCell>
            <TableCell align="left">
                <Box sx={ButtonContainerBoxStyle}>
                    <Button onClick={openModalHandler}
                            sx={{ ...BothActionsContainerButtonStyle, ...ConfirmButtonContainerButtonStyle }}
                            variant="outlined"
                            size="small">
                        Edit
                    </Button>

                </Box>
            </TableCell>


            <Dialog open={openModal} onClose={closeModalHandler} sx={ModalContainerDialogStyle}>
                <Box sx={ModalContentContainerBoxStyle}>
                    <DialogTitle sx={ModalTitleContainerDialogTitleStyle}>Save Address</DialogTitle>

                    <Box>
                        <label>Address</label>
                        <Input type="text" value={address} disabled sx={ModalInputContainerInputStyle} disableUnderline={true} />
                    </Box>

                    <Box>
                        <label>New Alias:</label>
                        <Input
                            type="text"
                            value={newAlias}
                            onChange={(event) => setNewAlias(event.target.value)}
                            placeholder={checkObjectInDb("Contacts", address) ? getKeyValueFromDbObject("Contacts", address) : "Enter Alias for the address"}
                            sx={ModalInputContainerInputStyle}
                            disableUnderline={true}
                        />
                    </Box>

                    <Box sx={ModalButtonsContainerBoxStyle}>
                        <Button onClick={saveAliasHandler} sx={SendButtonContainerButtonStyle}>Save</Button>
                        <Button onClick={closeModalHandler} sx={CloseButtonContainerButtonStyle}>Cancel</Button>
                    </Box>
                </Box>
            </Dialog>
        </TableRow>
    );
};

export default Contact;