import { useState } from "react";
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
import { styled } from "@mui/system";
import appImage from "../../assets/kaspa-icon-green-white.svg";
import { IconButton } from "@mui/material";

const Logo = styled("img")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginBottom: "16px"
});

const SignInForm = () => {
  const [formData, setFormData] = useState({
    privateKey: "",
    address: ""
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.privateKey) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.privateKey)) {
      newErrors.email = "Please enter a valid private key";
    }

    if (!formData.address) {
      newErrors.password = "Password is required";
    } else if (formData.address.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitStatus("success");
      console.log("Form submitted:", formData);
    } else {
      setSubmitStatus("error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <Container >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        width: "100%",
        margin: "40px auto"
      }} component="form" onSubmit={handleSubmit}>
        <Box sx={{
            textAlign: "center",
            marginBottom: "20px"
        }}>
          <Logo
            src={appImage}
            alt="Profile"
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Enter your private key and address to access your account
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
          value={formData.privateKey}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
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
              </InputAdornment>
            )
          }}

        />

        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          inputProps={{ readOnly: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AddressIcon />
              </InputAdornment>
            )
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            mt: 2,
            backgroundColor: "#6fc7b7",
            "&:hover": {
              backgroundColor: "#707579"
            }
          }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default SignInForm;
