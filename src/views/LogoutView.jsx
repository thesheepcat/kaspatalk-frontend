import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GeneralContextProvider } from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";

const LoginView = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    }, [navigate]);
    
    const { updateOpenMenuDrawer} = useContext(GeneralContextProvider);
    return(
        <>
            <Button sx={{ height: 60}} onClick={() => updateOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div>
                <h3>Logout view</h3>
            </div>
        </>
    );
};

export default LoginView;