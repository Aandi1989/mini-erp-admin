/* This file shows the actual React + MobX usage. */ 

import { observer } from "mobx-react-lite";
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

// patientList is static mock data for the select options.
import { patientList } from "../../mock-api/data"; 
import { useStore } from "../../mobx/rootStore";

/* This is the most important line 'observer(() => {'. Without observer, the component can still call store 
    methods, but it will not automatically re-render when observable MobX values change. */
export const MobxPatientPage = observer(() => {
  // Getting Store. This gets the patientStore created in: src/mobx/rootStore.tsx
  const { patientStore } = useStore();

  return (
    <Stack spacing={3}>
      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <div>
            <Typography variant="h5" gutterBottom>
              MobX patient store
            </Typography>
            <Typography color="text.secondary">
              This page mirrors the ERP UI patientStore pattern with a small class-based MobX store.
            </Typography>
          </div>

          <TextField
            select
            label="Patient"
            // Read selected patient from MobX and update it by calling a store action.
            value={patientStore.patientFullData?.id ?? ""}
            onChange={(event) => patientStore.selectPatientById(Number(event.target.value))}
            sx={{ maxWidth: 320 }}
          >
            {patientList.map((patient) => (
              <MenuItem key={patient.id} value={patient.id}>
                {patient.firstName} {patient.lastName}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <Typography variant="h6">Observable patient state</Typography>
          <Typography color="text.secondary">patientFullName={patientStore.patientFullName}</Typography>
          <Typography color="text.secondary">
            patientId={patientStore.patientFullData?.id ?? "none"}
          </Typography>
          <Typography color="text.secondary">filesCount={patientStore.patientFiles.length}</Typography>
        </Stack>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <Typography variant="h6">MobX actions</Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            {/* Call async MobX action; UI reacts to observable loading/files state. */}
            <Button
              variant="contained"
             // void marks that the returned Promise is intentionally not awaited in the click handler.
              onClick={() => void patientStore.getPatientFiles()}
              disabled={patientStore.isLoadingFiles || !patientStore.patientFullData}
            >
              {patientStore.isLoadingFiles ? "Loading..." : "Load patient files"}
            </Button>
            {/* Reset observable store state through a MobX action. */}
            <Button variant="outlined" onClick={patientStore.onResetFullData}>
              Reset patient store
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <Typography variant="h6">Patient files</Typography>

          {patientStore.isLoadingFiles ? (
            <div className="loading-state">
              <CircularProgress size={32} />
              <Typography color="text.secondary">Loading patient files...</Typography>
            </div>
          ) : null}

          {patientStore.errorMessage ? (
            <Alert severity="error">{patientStore.errorMessage}</Alert>
          ) : null}

          {!patientStore.errorMessage &&
          !patientStore.isLoadingFiles &&
          patientStore.patientFullData &&
          patientStore.patientFiles.length === 0 ? (
            <Typography color="text.secondary">No files loaded for this patient.</Typography>
          ) : null}

          {!patientStore.isLoadingFiles ? (
            <Stack spacing={1.5}>
              {patientStore.patientFiles.map((file) => (
                <Paper key={file.id} className="data-row" elevation={0}>
                  <Typography sx={{ fontWeight: 600 }}>{file.name}</Typography>
                  <Typography color="text.secondary">type={file.type}</Typography>
                </Paper>
              ))}
            </Stack>
          ) : null}
        </Stack>
      </Paper>
    </Stack>
  );
});
