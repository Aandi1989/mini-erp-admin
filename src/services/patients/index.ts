import { patientList } from "../../mock-api/data";
import { mockRequest } from "../../mock-api/http";

interface GetPatientsParams {
  city?: string;
  department?: string;
  date?: string;
  signal?: AbortSignal;
}

class PatientsService {
  static async getPatients({ city, department, date, signal }: GetPatientsParams) {
    return mockRequest(
      () =>
        patientList.filter((patient) => {
          const matchCity = city ? patient.city === city : true;
          const matchDepartment = department ? patient.department === department : true;
          const matchDate = date ? patient.visitDate === date : true;

          return matchCity && matchDepartment && matchDate;
        }),
      { signal, delay: 900, failRate: 0.1 },
    );
  }

  static async savePatientNote(patientId: number, note: string, signal?: AbortSignal) {
    return mockRequest(
      () => ({
        patientId,
        note,
        savedAt: new Date().toISOString(),
      }),
      { signal, delay: 650, failRate: 0.15 },
    );
  }
}

export default PatientsService;
