import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Contact from "./Contact.jsx";
import { Typography } from "@mui/material";
import {
    ActionContainerTypographyStyle,
    AddressContainerTypographyStyle, ContactContainerListStyle,
    ShellContainerBoxStyle,
    TableHeaderContainerBoxStyle,
    TypographyContainerSpanStyle
} from "./ContactList.styles.js";

const ContactList = () => {
    const contacts = JSON.parse(localStorage.getItem("Contacts")) || {};

    return (
        <Box sx={ShellContainerBoxStyle}>
            <Box sx={TableHeaderContainerBoxStyle}>
                <Typography sx={TypographyContainerSpanStyle} component="span">
                    Name:
                </Typography>
                <Typography
                    sx={{ ...TypographyContainerSpanStyle, ...AddressContainerTypographyStyle }}
                    component="span"
                >
                    Address:
                </Typography>
                <Typography sx={{...TypographyContainerSpanStyle, ...ActionContainerTypographyStyle}} component="span">
                    Actions:
                </Typography>
            </Box>
            <List
                sx={ContactContainerListStyle}
            >
                {Object.entries(contacts).map(([address, name]) => (
                    <Contact key={address} name={name} address={address} />
                ))}
            </List>
        </Box>
    );
};

export default ContactList;