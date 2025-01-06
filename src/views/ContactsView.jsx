import { useContext } from "react";
import { GeneralContextProvider} from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";

const ContactsView = () => {
    const { updateOpenMenuDrawer} = useContext(GeneralContextProvider);
    return(
        <>
            <Button sx={{ height: 30}} onClick={() => updateOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div>
                <h3>Contacts view</h3>
            </div>
            
        </>
    );
};

export default ContactsView;