import { useEffect, useState } from "react";
import { Alert, CircularProgress, Paper, Stack, Typography } from "@mui/material";

import type { ServiceListItem } from "../../mock-api/data";
import ClinicServicesService from "../../services/services";

export const ServicesPage = () => {
  const [services, setServices] = useState<ServiceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const loadServices = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setServices([]);

      try {
        const result = await ClinicServicesService.getServices(signal);

        if (!signal.aborted) {
          setServices(result);
        }
      } catch (error) {
        if (!signal.aborted && error instanceof Error) {
          setErrorMessage(error.message);
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadServices();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Paper className="feature-card" elevation={0}>
      <Stack spacing={2}>
        <div className="data-section__header">
          <div>
            <Typography variant="h5" gutterBottom>
              Services
            </Typography>
            <Typography color="text.secondary">
              This page now loads data through a service layer instead of hardcoding the content.
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

        {!errorMessage && !isLoading && services.length === 0 ? (
          <Typography color="text.secondary">No services are available right now.</Typography>
        ) : null}

        {!isLoading ? (
          <Stack spacing={1.5}>
            {services.map((service) => (
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
