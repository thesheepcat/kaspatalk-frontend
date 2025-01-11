import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserKeysContext } from "../components/ContextProviders/UserKeysContextProvider.jsx";
import { GeneralContext} from "../components/ContextProviders/GeneralContextProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Button } from "@mui/material";

const UserProfileView = () => {
    const { setOpenMenuDrawer} = useContext(GeneralContext);
    const { userPrivateKey } = useContext(UserKeysContext);
        const navigate = useNavigate();
        // Check if Private Key is available; if not, redirect to login
        useEffect(() => {
            if (!userPrivateKey) {
                navigate('/login');
            }        
        }, [navigate, userPrivateKey]);

    return(
        <>
        <Button sx={{ height: 60}} onClick={() => setOpenMenuDrawer(true)}>
                <FontAwesomeIcon icon={faBars} />
            </Button>
            <div>
                <h3>User profile view</h3>
            </div>
        </>
    );
};

export default UserProfileView;