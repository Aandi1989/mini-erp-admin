import { useEffect } from "react";
import { Alert, CircularProgress, Paper, Stack, Typography } from "@mui/material";

import { fetchServices } from "../../store/services";
import { useAppDispatch, useAppSelector } from "../../store";

export const ServicesPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading, errorMessage } = useAppSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <Paper className="feature-card" elevation={0}>
      <Stack spacing={2}>
        <div className="data-section__header">
          <div>
            <Typography variant="h5" gutterBottom>
              Services
            </Typography>
            <Typography color="text.secondary">
              This page now loads data through a Redux async thunk instead of local component async
              state.
            </Typography>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-state">
            <CircularProgress size={32} />
            <Typography color="text.secondary">Loading services...</Typography>
          </div>
        ) : null}

        {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

        {!errorMessage && !isLoading && items.length === 0 ? (
          <Typography color="text.secondary">No services are available right now.</Typography>
        ) : null}

        {!isLoading ? (
          <Stack spacing={1.5}>
            {items.map((service) => (
              <Paper key={service.id} className="data-row" elevation={0}>
                <Typography fontWeight={600}>{service.name}</Typography>
                <Typography color="text.secondary">
                  department={service.department}, price=${service.price}
                </Typography>
              </Paper>
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Paper>
  );
};
