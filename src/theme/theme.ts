import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f6f5c",
    },
    secondary: {
      main: "#c96c3a",
    },
    background: {
      default: "#f4f1ea",
      paper: "#fffdf8",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
});

export default theme;
