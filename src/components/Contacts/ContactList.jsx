import Box from "@mui/material/Box";
import Contact from "./Contact.jsx";
import {
    ShellContainerBoxStyle, TableCellCustomStyle
} from "./ContactList.styles.js";
import {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox,  IconButton} from "@mui/material";
import {getObjectFromDb, removeItem, removeKeyPairFromDb} from "../../storage/storage.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


const ContactList = () => {
    const [contacts, setContacts] = useState(getObjectFromDb("Contacts") || {});

    const [selected, setSelected] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [isSomeSelected, setIsSomeSelected] = useState(false);

    const handleSelectAllClick = () => {
        if (isAllSelected) {
            setSelected([]);
            setIsSomeSelected(false);
        } else {
            setSelected(Object.keys(contacts));
            setIsSomeSelected(true);
        }
        setIsAllSelected(!isAllSelected);
    }


    const handleSelectContact = (address) => {
        const currentIndex = selected.indexOf(address);
        const newSelected = [...selected];
        if (currentIndex === -1) {
            newSelected.push(address);
        } else {
            newSelected.splice(currentIndex, 1);
        }
        setSelected(newSelected);
        setIsAllSelected(newSelected.length === Object.keys(contacts).length);
        setIsSomeSelected(newSelected.length > 0 && newSelected.length < Object.keys(contacts).length);
    };
    const handleDeleteSelected = () => {
        let confirmation = window.confirm("Are you sure?");
        if (confirmation){
            //if all are selected just erase everything
            if(selected.length === contacts.length) {
                removeItem("Contacts")
                setSelected([]);
                setContacts({})
                return;
            }
            selected.map(address => {
                removeKeyPairFromDb("Contacts", address);
            })
            setContacts(getObjectFromDb("Contacts") || {})
            setSelected([]);

        }
    }

    return (
        <Box sx={ShellContainerBoxStyle}>
            <TableContainer  component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={isAllSelected}
                                    indeterminate={isSomeSelected && !isAllSelected}
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all' }}
                                />
                            </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Address</TableCell>
                            <TableCell align="left"

                                       sx={TableCellCustomStyle}
                            >Actions
                                    <IconButton
                                        sx = {{
                                            display : isSomeSelected || isAllSelected ? "" : "none"}}
                                        onClick={handleDeleteSelected}
                                        variant="outlined"
                                        color="error"
                                    >
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </IconButton>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(contacts).map(([address, name]) => (
                            <Contact
                                key={address}
                                name={name}
                                address={address}
                                isChecked={selected.includes(address)}
                                onSelect={handleSelectContact}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ContactList;