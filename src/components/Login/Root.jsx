import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import LoginForm from './LoginForm.jsx';

const Root = () => {
    return <>
        <Box sx={{width: '60%'}}>
            <Card sx={{p: '26px 32px 46px 32px'}}>
                <LoginForm/>
            </Card>
        </Box>
    </>;
}

export default Root;
