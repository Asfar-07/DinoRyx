import axios from "axios";
import { statusHandle } from "../../utils/statusHandle";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const handleDashboard = {
  createDashboard: async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/dashboard/create/dashboard",
        "data",
        headerForm,
      );
      //   statusHandle.statusInfo(res.status);
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
};
