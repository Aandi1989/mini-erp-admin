export interface PatientListItem {
  id: number;
  firstName: string;
  lastName: string;
  city: "minsk" | "brest" | "grodno";
  department: "reception" | "diagnostics" | "surgery";
  visitDate: string;
}

export interface PatientFileItem {
  id: number;
  patientId: number;
  name: string;
  type: "pdf" | "image" | "document";
}

export interface ServiceListItem {
  id: number;
  name: string;
  department: "reception" | "diagnostics" | "surgery";
  price: number;
}

export const patientList: PatientListItem[] = [
  {
    id: 42,
    firstName: "Aliaksandr",
    lastName: "Novik",
    city: "brest",
    department: "diagnostics",
    visitDate: "2026-04-29",
  },
  {
    id: 43,
    firstName: "Anna",
    lastName: "Kovalenko",
    city: "minsk",
    department: "reception",
    visitDate: "2026-04-29",
  },
  {
    id: 44,
    firstName: "Pavel",
    lastName: "Sidorov",
    city: "grodno",
    department: "surgery",
    visitDate: "2026-04-30",
  },
  {
    id: 45,
    firstName: "Maria",
    lastName: "Ivanova",
    city: "minsk",
    department: "diagnostics",
    visitDate: "2026-05-01",
  },
];

export const patientFilesList: PatientFileItem[] = [
  { id: 1, patientId: 42, name: "Diagnostics report", type: "pdf" },
  { id: 2, patientId: 42, name: "Retina scan", type: "image" },
  { id: 3, patientId: 43, name: "Reception note", type: "document" },
  { id: 4, patientId: 45, name: "Surgery preparation checklist", type: "document" },
];

export const serviceList: ServiceListItem[] = [
  { id: 1, name: "Initial consultation", department: "reception", price: 45 },
  { id: 2, name: "Eye diagnostics", department: "diagnostics", price: 80 },
  { id: 3, name: "Laser correction prep", department: "surgery", price: 150 },
];
