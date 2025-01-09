import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import {
    AddressContainerTypographyStyle,
    BothActionsContainerButtonStyle, CancelButtonContainerButtonStyle, ConfirmButtonContainerButtonStyle,
    ListItemShellContainerBoxStyle
} from "./Contact.styles.js";



const Contact = ({ name, address }) => {
    return (
        <ListItem sx={ListItemShellContainerBoxStyle}>
            <Typography component="span" sx={{ flex: "1 0 auto", textAlign: "left" }}>
                {name}
            </Typography>
            <Typography
                component="span"
                sx={{
                    ...AddressContainerTypographyStyle,
                    justifyContent: "flex-start",
                }}
            >
                {address}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
                {/* Puoi aggiungere qui i bottoni per le azioni */}
                <Button sx={{ ...BothActionsContainerButtonStyle,
                    ...ConfirmButtonContainerButtonStyle}} variant="outlined" size="small">
                    Edit
                </Button>
                <Button sx={{ ...BothActionsContainerButtonStyle,
                    ...CancelButtonContainerButtonStyle}}  variant="outlined" size="small" color="error">
                    Delete
                </Button>
            </Box>
        </ListItem>
    );
};

export default Contact;