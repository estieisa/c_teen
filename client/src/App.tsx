import Router from "./router/Router";
import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "./theme";

export default function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider> 
  );
}
