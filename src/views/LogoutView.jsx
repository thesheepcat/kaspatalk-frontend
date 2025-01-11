import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserKeysContext } from "../components/ContextProviders/UserKeysContextProvider.jsx";
import { GeneralContext } from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@mui/material";

const LogoutView = () => {
    const navigate = useNavigate();
    const { setUserPrivatekey, setUserAddress  } = useContext(UserKeysContext);
    const { setPeersList, setSelectedPeer } = useContext(GeneralContext);

    useEffect(() => {
        // Reset temporary data
        setUserPrivatekey("");
        setUserAddress("");
        setPeersList([]);
        setSelectedPeer("");
        navigate('/login');
    }, [navigate]);
    
    const { setOpenMenuDrawer} = useContext(GeneralContext);
    return(
        <>
            <Button sx={{ height: 60}} onClick={() => setOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div>
                <h3>Logout view</h3>
            </div>
        </>
    );
};

export default LogoutView;