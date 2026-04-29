import { Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

import { useAppSearchParams } from "../../shared/hooks/useAppSearchParams";

const cityOptions = [
  { value: "minsk", label: "Minsk" },
  { value: "brest", label: "Brest" },
  { value: "grodno", label: "Grodno" },
];

const departmentOptions = [
  { value: "reception", label: "Reception" },
  { value: "diagnostics", label: "Diagnostics" },
  { value: "surgery", label: "Surgery" },
];

export const PatientsPage = () => {
  const {
    queryCity,
    queryDepartment,
    queryDate,
    handleChangeSearchParam,
    handleChangeMultipleSearchParams,
  } = useAppSearchParams();

  const patientDetailsLink = `/patients/42?city=${queryCity}&department=${queryDepartment}&date=${queryDate}`;

  return (
    <Stack spacing={3}>
      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <div>
            <Typography variant="h5" gutterBottom>
              Patients
            </Typography>
            <Typography color="text.secondary">
              These filters live in the URL, so the current screen state can be shared, reloaded,
              and debugged from the address bar.
            </Typography>
          </div>

          <Stack className="filters-toolbar" direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              select
              label="City"
              value={queryCity}
              onChange={(event) => handleChangeSearchParam("city", event.target.value)}
            >
              {cityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Department"
              value={queryDepartment}
              onChange={(event) => handleChangeSearchParam("department", event.target.value)}
            >
              {departmentOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Date"
              type="date"
              value={queryDate}
              onChange={(event) => handleChangeSearchParam("date", event.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </Stack>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Typography variant="h6" gutterBottom>
          Current URL-driven state
        </Typography>
        <Typography color="text.secondary">
          city={queryCity}, department={queryDepartment}, date={queryDate}
        </Typography>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Typography variant="h6" gutterBottom>
          Example of changing several params at once
        </Typography>
        <Typography
          color="text.secondary"
          className="filters-toolbar__link"
          onClick={() =>
            handleChangeMultipleSearchParams({
              city: "minsk",
              department: "reception",
            })
          }
        >
          Reset city and department to default values
        </Typography>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <div>
            <Typography variant="h6" gutterBottom>
              Route params example
            </Typography>
            <Typography color="text.secondary">
              Open a patient details page where the patient id is part of the route path.
            </Typography>
          </div>

          <Button component={NavLink} to={patientDetailsLink} variant="outlined" sx={{ alignSelf: "flex-start" }}>
            Open patient 42 details
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
