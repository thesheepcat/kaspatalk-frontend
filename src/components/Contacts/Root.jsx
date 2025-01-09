
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {RootContainerBoxStyle} from "./Root.styles.js";
import ContactList from "./ContactList.jsx";



const Root = () => {


    return (

        <Box sx={RootContainerBoxStyle}>
            <Typography variant={'h3'} >Contacts view</Typography>
            <ContactList/>
        </Box>

    )
}

export default Root;