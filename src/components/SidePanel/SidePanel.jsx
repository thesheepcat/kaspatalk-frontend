import Header from "./Header";
import BodyContainer from "./BodyContainer";
import Box from "@mui/material/Box";


const SidePanel = () => {
    
    
    return (
        // <aside className={styles.sidePanel} >
        //     <Header />
        //     <BodyContainer />
        // </aside>
        <Box sx={{ display: "flex", flexDirection: "column", width: {
                xs: "50%",
                sm: 250,
                md: 300,
            },
            minWidth: 150
        }}>
            <Header />
            <BodyContainer />
        </Box>
    )
}

export default SidePanel;
