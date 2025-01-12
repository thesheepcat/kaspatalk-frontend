import ChatList from "./ChatList";
import Box from "@mui/material/Box";
import {BodyContainerContainerBoxStyle} from "./BodyContainer.styles.js";

const BodyContainer = () => {
    return(
        <Box sx={BodyContainerContainerBoxStyle}>
            <ChatList/>
        </Box>
    );
}

export default BodyContainer;