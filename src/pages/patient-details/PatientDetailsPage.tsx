import { Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { useAppSearchParams } from "../../shared/hooks/useAppSearchParams";

export const PatientDetailsPage = () => {
  const { patientId } = useParams();
  const { queryCity, queryDepartment, queryDate } = useAppSearchParams();

  return (
    <Stack spacing={3}>
      <Paper className="feature-card" elevation={0}>
        <Typography variant="h5" gutterBottom>
          Patient details
        </Typography>
        <Typography color="text.secondary">
          The patient id comes from the route path, while city, department, and date come from the
          query string.
        </Typography>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Typography variant="h6" gutterBottom>
          Route param
        </Typography>
        <Typography color="text.secondary">patientId={patientId}</Typography>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Typography variant="h6" gutterBottom>
          Search params
        </Typography>
        <Typography color="text.secondary">
          city={queryCity}, department={queryDepartment}, date={queryDate}
        </Typography>
      </Paper>
    </Stack>
  );
};
