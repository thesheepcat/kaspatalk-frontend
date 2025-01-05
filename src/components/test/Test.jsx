import { Button, Card, CardContent, Typography } from '@mui/material';

const Test = () => {
    return(
        <div style={{ padding: '40px' }}>
        <Card sx={{ 
          maxWidth: 400, 
          minWidth: 300
          }}>
          <CardContent>
            <Typography variant="h3" component="div">
              Material UI Card
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a simple card component from Material UI.
            </Typography>
          </CardContent>
        </Card>
  
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
        >
          Primary Button
        </Button>
      </div>
    );
};

export default Test;