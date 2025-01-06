import { useContext } from "react";
import { GeneralContextProvider} from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";

const SettingsView = () => {
    const { updateOpenMenuDrawer} = useContext(GeneralContextProvider);

    return(
        <>
            <Button sx={{ height: 60}} onClick={() => updateOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div>
                <h3>Settings view</h3>
            </div>
        </>
    );
};

export default SettingsView;
