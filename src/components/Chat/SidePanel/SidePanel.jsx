import Header from "./Header";
import BodyContainer from "./BodyContainer";
import Box from "@mui/material/Box";
import {SidePanelContainerBoxStyle} from "./SidePanel.styles.js";


const SidePanel = () => {
    
    
    return (

        <Box sx={SidePanelContainerBoxStyle}>
            <Header />
            <BodyContainer />
        </Box>
    )
}

export default SidePanel;
