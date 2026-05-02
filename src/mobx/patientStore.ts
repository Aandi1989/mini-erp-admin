import { makeAutoObservable, runInAction } from "mobx";

import type { PatientFileItem, PatientListItem } from "../mock-api/data";
import { patientFilesList, patientList } from "../mock-api/data";
import { mockRequest } from "../mock-api/http";

class PatientStore {
  constructor() {
    /* makeAutoObservable(this) tells MobX: 
    Watch this class instance. Make its 
      fields --> observable
      getter --> computed 
      methods --> actions */ 
    makeAutoObservable(this);
  }

  /* Observable State. Meaning:
  'If an observer React component reads these values, it will re-render when they change.'*/ 
  patientFullData: PatientListItem | null = null;

  patientFiles: PatientFileItem[] = [];

  isLoadingFiles = false;

  errorMessage = "";


  /* Computed Value
  It is derived from observable state: this.patientFullData. We dont set patientFullName manually.
  MobX recalculates it when patientFullData changes. */
  get patientFullName() {
    if (!this.patientFullData) {
      return "No patient selected";
    }

    return `${this.patientFullData.firstName} ${this.patientFullData.lastName}`;
  }

  /* Simple Action
  This method changes observable state. */
  setPatientFullData = (patient: PatientListItem | null) => {
    this.patientFullData = patient;
    this.patientFiles = [];
    this.errorMessage = "";
  };

  /* Instead of 'dispatch(setSelectedCity("brest"))' 
  MobX often looks like: patientStore.selectPatientById(42);
  */
  selectPatientById = (patientId: number) => {
    const patient = patientList.find((item) => item.id === patientId) ?? null;
    this.setPatientFullData(patient);
  };

  /* Async Action */
  getPatientFiles = async () => {
    if (!this.patientFullData) {
      this.errorMessage = "Select a patient first.";
      return;
    }

    this.isLoadingFiles = true;
    this.errorMessage = "";

    try {
      const files = await mockRequest(
        () => patientFilesList.filter((file) => file.patientId === this.patientFullData?.id),
        { delay: 700, failRate: 0.1 },
      );

      /* runInAction(...) is used after async work when we want to update observable state safely */
      runInAction(() => {
        this.patientFiles = files;
      });
    } catch (error) {
      runInAction(() => {
        this.errorMessage =
          error instanceof Error ? error.message : "Failed to load patient files.";
      });
    } finally {
      runInAction(() => {
        this.isLoadingFiles = false;
      });
    }
  };

  /* Reset Action
  This resets the store to its initial state. */
  onResetFullData = () => {
    this.patientFullData = null;
    this.patientFiles = [];
    this.isLoadingFiles = false;
    this.errorMessage = "";
  };
}

export default PatientStore;
