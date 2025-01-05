import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./index.theme.js";

const root = createRoot(document.getElementById('root'))

root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);
