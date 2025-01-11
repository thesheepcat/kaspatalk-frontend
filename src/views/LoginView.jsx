import { useContext } from "react";
import { GeneralContext} from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";
import Root from "../components/Login/Root.jsx"; 

const LoginView = () => {
    const { setOpenMenuDrawer} = useContext(GeneralContext);

    return(
        <>
            <Button sx={{ height: 60}} onClick={() => setOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <Root />
        </>
    );
};

export default LoginView;
