import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserKeysContext } from "../components/ContextProviders/UserKeysContextProvider.jsx";

const HomeView = () => {
    const { userPrivateKey } = useContext(UserKeysContext);
    const navigate = useNavigate();
    
    // Check if Private Key is available; if not, redirect to login
    useEffect(() => {
        if (!userPrivateKey) {
            navigate('/login');
        } else {
            navigate('/chat');
        }        
    }, [navigate]);

    return(
        <>
        </>
    );
};

export default HomeView;