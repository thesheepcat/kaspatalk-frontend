import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserKeysContext } from "../components/ContextProviders/UserKeysContextProvider.jsx";

const HomeView = () => {
    const { userPrivatekey } = useContext(UserKeysContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("userPrivatekey");
        console.log(userPrivatekey);
        if (!userPrivatekey) {
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