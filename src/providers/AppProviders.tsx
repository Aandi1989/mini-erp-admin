import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

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

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    // Gives MUI theme values to the whole app.
    <ThemeProvider theme={theme}>
      {/* Applies MUI's base reset/default browser normalization. */}
      <CssBaseline />
      {/* Enables client-side routing. 
       Without it, Route, Routes, Navigate, NavLink, and Outlet would not work. */}
      <BrowserRouter>{children}</BrowserRouter>
    </ThemeProvider>
  );
};
