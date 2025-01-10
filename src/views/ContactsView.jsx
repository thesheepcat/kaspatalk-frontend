import { useContext } from "react";
import { GeneralContext} from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";

const ContactsView = () => {
    const { setOpenMenuDrawer} = useContext(GeneralContext);
    return(
        <>
            <Button sx={{ height: 30}} onClick={() => setOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div>
                <h3>Contacts view</h3>
            </div>
            
        </>
    );
};

export default ContactsView;