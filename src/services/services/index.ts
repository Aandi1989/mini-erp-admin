import { serviceList } from "../../mock-api/data";
import { mockRequest } from "../../mock-api/http";

class ClinicServicesService {
  static async getServices(signal?: AbortSignal) {
    return mockRequest(() => serviceList, { signal, delay: 850, failRate: 0.05 });
  }
}

export default ClinicServicesService;
