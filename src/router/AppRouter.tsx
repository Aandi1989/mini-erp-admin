import { Navigate, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { MobxPatientPage } from "../pages/mobx-patient/MobxPatientPage";
import { NotFoundPage } from "../pages/not-found/NotFoundPage";
import { PatientDetailsPage } from "../pages/patient-details/PatientDetailsPage";
import { PatientsPage } from "../pages/patients/PatientsPage";
import { ServicesPage } from "../pages/services/ServicesPage";
import { AppLayout } from "../shared/layout/AppLayout";

export const AppRouter = () => {
  return (
    <Routes>
      {/* AppLayout is the shared page shell,  nested routes are the pages that should appear inside that shell. 
      We dont have path= here because this route is being used only as a layout wrapper for its child routes.*/}
      <Route element={<AppLayout />}>
        {/* Render AppLayout first. Then inside it render one of the child routes depending on the URL.
        Navigate makes a redirect from "/" to "/dashboard". replace avoids leaving the old route in browser history.*/}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/:patientId" element={<PatientDetailsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/mobx-patient" element={<MobxPatientPage />} />
        {/* path="*" is usually used as a catch-all route for unknown URLs. 
         <Route path="*" element={<NotFoundPage />} />  */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
