import type { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import theme from "../theme/theme";
import { store } from "../store";
import { rootStore, StoreProvider } from "../mobx/rootStore";

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    // Gives MUI theme values to the whole app.
    <ThemeProvider theme={theme}>
      {/* Applies MUI's base reset/default browser normalization. */}
      <CssBaseline />
      {/* Every React component inside this provider can access the Redux store. */}
      <Provider store={store}>
        {/* Makes MobX stores available to all components below. */}
        <StoreProvider value={rootStore}>
          {/* Enables client-side routing. 
       Without it, Route, Routes, Navigate, NavLink, and Outlet would not work. */}
          <BrowserRouter>{children}</BrowserRouter>
        </StoreProvider>
      </Provider>
    </ThemeProvider>
  );
};
