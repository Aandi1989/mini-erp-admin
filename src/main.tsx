import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { AppProviders } from "./providers/AppProviders";
import "./styles/index.scss";

/* This file is the bridge between plain HTML and React. 
It imports the top-level app pieces: App, wrapper/providers, global styles. 
This file is usually the place for global setup, not business logic, not page logic. */ 

// Finds the root DOM node and creates a React root.
createRoot(document.getElementById("root")!).render(
  // Run the app inside React  strict checks.
  <StrictMode>
    {/*Wrap the app with shared global providers.*/}
    <AppProviders>
      {/*Render the actual app.*/}
      <App />
    </AppProviders>
  </StrictMode>,
);
