import { useContext, useState, useNavigate } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import KeyIcon from '@mui/icons-material/Key';
import AddressIcon from '@mui/icons-material/AlternateEmail';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { styled } from "@mui/system";
import appImage from "../../assets/kaspa-icon-green-white.svg";
import { IconButton } from "@mui/material";
import { UserKeysContext } from "../ContextProviders/UserKeysContextProvider.jsx";
import { UserSettingsContext } from "../ContextProviders/UserSettingsContextProvider.jsx";
import { formBoxStyle, formHeaderBoxStyle, submitButtonStyle } from "./LoginForm.styles.js";
import { getAddressFromPrivateKey } from "../../utils/conversions.js";

const Logo = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginBottom: "16px"
});

const LoginForm = () => {
  const { setUserPrivatekey, setUserAddress } = useContext(UserKeysContext);
  const { networkIdentifier } = useContext(UserSettingsContext)
  const [ formPrivateKey, setFormPrivateKey] = useState("")
  const [ formAddress, setFormAddress ] = useState("")
  const [ isFormAddressCorrect, setIsFormAddressCorrect ] = useState()
  
  const [ privateKeyInputError, setPrivateKeyInputError ] = useState();
  const [ submitStatus, setSubmitStatus ] = useState("");

  const validateForm = () => {
    let newError = null;
    if (!formPrivateKey) {
      newError = "Private key is required";
    } else if (false) {
      // Add additional validations on Private Key #TODO
      newError = "Private key is invalid. Please enter a valid private key";
    }

    setPrivateKeyInputError(newError);
    return newError === null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      setSubmitStatus("success");
      setUserPrivatekey(formPrivateKey);
      setUserAddress(formAddress);
      console.log("Form submitted:");
      console.log("Private Key: ", formPrivateKey);
      console.log("Address: ", formAddress);
    } else {
      setSubmitStatus("error");
    }
  };

  const handleChange = (event) => {
    const inputPrivateKey = event.target.value;  
    setFormPrivateKey(inputPrivateKey);
    const derivedAddress = getAddressFromPrivateKey(inputPrivateKey, networkIdentifier);
    if (derivedAddress != undefined) {
      setFormAddress(derivedAddress);
      setIsFormAddressCorrect(true);
    } else {
      setFormAddress("Invalid address");
      setIsFormAddressCorrect(false);
    }
    // Clear errors when user starts typing
    if (privateKeyInputError) {
      setPrivateKeyInputError(null);
    }
  };

  const handleMoveToChat = () => {
    //const navigate = useNavigate();
    //navigate('/chat');
  }

  return (
    <Container>
      <Box sx={formBoxStyle} component="form" onSubmit={handleSubmit}>
        <Box sx={formHeaderBoxStyle}>
          <Logo src={appImage} alt="Kaspa Logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter your private key or generate a new one
          </Typography>
        </Box>

        {submitStatus === "success" && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Successfully signed in!
          </Alert>
        )}

        <TextField
          fullWidth
          label="Private Key"
          name="privateKey"
          value={formPrivateKey}
          onChange={handleChange}
          error={Boolean(privateKeyInputError)}
          helperText={privateKeyInputError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon/>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <ContentPasteIcon/>
                </IconButton>
                <IconButton>
                  <AutorenewIcon/>
                </IconButton>
              </InputAdornment>
            )
          }}

        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formAddress}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <AddressIcon />
              </InputAdornment>
            )
          }}
        />

        {(!submitStatus && isFormAddressCorrect) &&
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={submitButtonStyle}
          >
            Sign In
          </Button>
        }
      </Box>
    </Container>
  );
};

export default LoginForm;
