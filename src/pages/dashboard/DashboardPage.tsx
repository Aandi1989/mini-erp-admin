import { useState } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";

import { useAppNavigate } from "../../shared/hooks/useAppNavigate";

interface TrainingCounterCardProps {
  title: string;
  value: number;
  description: string;
  onIncrement: () => void;
}

const TrainingCounterCard = ({
  title,
  value,
  description,
  onIncrement,
}: TrainingCounterCardProps) => {
  return (
    <Paper className="feature-card" elevation={0}>
      <Stack spacing={2}>
        <div>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography color="text.secondary">{description}</Typography>
        </div>

        <div>
          <Typography variant="overline" color="text.secondary">
            Local state value
          </Typography>
          <Typography variant="h3" className="dashboard-counter__value">
            {value}
          </Typography>
        </div>

        <Button variant="contained" onClick={onIncrement} sx={{ alignSelf: "flex-start" }}>
          Increase value
        </Button>
      </Stack>
    </Paper>
  );
};

export const DashboardPage = () => {
  const [reviewedScreens, setReviewedScreens] = useState(1);
  const { navigateWithFilters } = useAppNavigate();

  const handleIncreaseReviewedScreens = () => {
    setReviewedScreens((currentValue) => currentValue + 1);
  };

  const handleOpenPatientsPage = () => {
    navigateWithFilters({
      to: "/patients",
      searchParams: {
        city: "brest",
        department: "diagnostics",
      },
    });
  };

  return (
    <Stack spacing={3}>
      <TrainingCounterCard
        title="Props and state training card"
        value={reviewedScreens}
        description="DashboardPage owns the state and passes data into this child component through props."
        onIncrement={handleIncreaseReviewedScreens}
      />

      <Paper className="feature-card" elevation={0}>
        <Stack spacing={2}>
          <div>
            <Typography variant="h5" gutterBottom>
              Why this shell exists
            </Typography>
            <Typography color="text.secondary">
              This app is intentionally starting with structure first. We want the same top-level
              ideas as the real ERP UI before we add business logic.
            </Typography>
          </div>

          <Button variant="outlined" onClick={handleOpenPatientsPage} sx={{ alignSelf: "flex-start" }}>
            Open Patients with prefilled filters
          </Button>
        </Stack>
      </Paper>

      <Paper className="feature-card" elevation={0}>
        <Typography variant="h6" gutterBottom>
          What we will add next
        </Typography>
        <Typography color="text.secondary">
          Query params, service layer, Redux Toolkit, forms, MobX reading practice, and real
          debugging habits.
        </Typography>
      </Paper>
    </Stack>
  );
};
