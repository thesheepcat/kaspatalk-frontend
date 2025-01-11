import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserKeysContext } from "../components/ContextProviders/UserKeysContextProvider.jsx";
import SidePanel from '../components/Chat/SidePanel/SidePanel.jsx';
import MainWindow from '../components/Chat/MainWindow/MainWindow.jsx';

const ChatView = () => {
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
            <SidePanel />
            <MainWindow />
        </>
    );
};

export default ChatView;