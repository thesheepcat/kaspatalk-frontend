import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Helmet } from 'react-helmet';
import Login from "./Login.jsx";

const Root = () => {
    return <>
        <Helmet><title>KaspaTalk - Sign in</title></Helmet>
        <Box sx={{width: '50%'}}>
            <Card sx={{p: '26px 32px 46px 32px'}}>
                <Login/>
            </Card>
        </Box>
    </>;
}

export default Root;
