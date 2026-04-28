import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";

// Right now we use this array mostly for mapping but conceptually it is a configuration object for navigation. 
const navigationItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/patients", label: "Patients" },
  { to: "/services", label: "Services" },
];

export const AppLayout = () => {
  return (
    <Box className="app-shell">
      <Paper className="app-shell__sidebar" elevation={0}>
        <Typography variant="h5" className="app-shell__brand">
          Mini ERP Admin
        </Typography>

        <Stack spacing={1.5}>
          {navigationItems.map((item) => (
            /* This means render this MUI Button but use NavLink as the the underlying component.  Then to={item.to} is passed 
            to NavLink, because NavLink understands to. As well NavLink can automatically know whether the current route is active.*/ 
            <Button
              key={item.to}
              component={NavLink}
              to={item.to}
              className="app-shell__nav-button"
              color="inherit"
              sx={{
                justifyContent: "flex-start",
                "&.active": {
                  backgroundColor: "rgba(31, 111, 92, 0.12)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Paper>

      <Box className="app-shell__content">
        <header className="app-shell__header">
          <Typography variant="overline" className="app-shell__eyebrow">
            Chapter 1
          </Typography>
          <Typography variant="h4" className="app-shell__title">
            App bootstrap, providers, router, and layout
          </Typography>
        </header>
        {/* "Outlet" is the place where React Router renders the matched child route. This is the  key idea of nested routing. */}
        <Outlet />
      </Box>
    </Box>
  );
};
