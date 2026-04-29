import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import type { PatientListItem } from "../../mock-api/data";
import { useAppSearchParams } from "../../shared/hooks/useAppSearchParams";
import PatientsService from "../../services/patients";

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
  const [patients, setPatients] = useState<PatientListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const patientDetailsLink = `/patients/42?city=${queryCity}&department=${queryDepartment}&date=${queryDate}`;

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const loadPatients = async () => {
      setIsLoading(true);
      setErrorMessage("");
      setPatients([]);

      try {
        const result = await PatientsService.getPatients({
          city: queryCity,
          department: queryDepartment,
          date: queryDate,
          signal,
        });

        if (!signal.aborted) {
          setPatients(result);
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

    loadPatients();

    return () => {
      abortController.abort();
    };
  }, [queryCity, queryDepartment, queryDate]);

  const handleSaveMockNote = async () => {
    const abortController = new AbortController();

    try {
      setIsSaving(true);
      setSaveStatus("Saving a demo note...");
      const result = await PatientsService.savePatientNote(
        42,
        "Frontend training note",
        abortController.signal,
      );
      setSaveStatus(`Saved at ${new Date(result.savedAt).toLocaleTimeString()}`);
    } catch (error) {
      if (error instanceof Error) {
        setSaveStatus(error.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

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
        <Stack spacing={2}>
          <div className="data-section__header">
            <Typography variant="h6">Fetched patients</Typography>
          </div>

          {isLoading ? (
            <div className="loading-state">
              <CircularProgress size={32} />
              <Typography color="text.secondary">Loading patients...</Typography>
            </div>
          ) : null}

          {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}

          {!errorMessage && !isLoading && patients.length === 0 ? (
            <Typography color="text.secondary">No patients match the current filters.</Typography>
          ) : null}

          {!isLoading ? (
            <Stack spacing={1.5}>
              {patients.map((patient) => (
                <Paper key={patient.id} className="data-row" elevation={0}>
                  <Typography fontWeight={600}>
                    {patient.firstName} {patient.lastName}
                  </Typography>
                  <Typography color="text.secondary">
                    city={patient.city}, department={patient.department}, date={patient.visitDate}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          ) : null}
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

      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <Typography variant="h6">Mock save action</Typography>
          <Typography color="text.secondary">
            This button simulates a save request, separate from the fetch request above.
          </Typography>
          <Button
            variant="contained"
            onClick={handleSaveMockNote}
            disabled={isSaving}
            sx={{ alignSelf: "flex-start" }}
          >
            {isSaving ? "Saving..." : "Save demo patient note"}
          </Button>
          {saveStatus ? <Alert severity="info">{saveStatus}</Alert> : null}
        </Stack>
      </Paper>
    </Stack>
  );
};
