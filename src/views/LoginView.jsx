import { useContext, useEffect } from "react";
import { GeneralContext } from "../components/ContextProviders/GeneralContextProvider";
import { useNavigate } from 'react-router-dom';
import { UserKeysContext } from "../components/ContextProviders/UserKeysContextProvider.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";
import Root from "../components/Login/Root.jsx"; 

const LoginView = () => {
    const { setOpenMenuDrawer} = useContext(GeneralContext);
    const { userPrivateKey } = useContext(UserKeysContext);
    const navigate = useNavigate();
        // Check if Private Key is available; if so, redirect to chat
        useEffect(() => {
            if (userPrivateKey) {
                navigate('/chat');
            }        
        }, [navigate, userPrivateKey]);
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
