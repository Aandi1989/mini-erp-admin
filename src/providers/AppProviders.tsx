import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "../theme/theme";

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
