import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/chat');
    }, [navigate]);

    return(
        <>
        </>
    );
};

export default HomeView;