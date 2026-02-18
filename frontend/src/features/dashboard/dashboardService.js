// @ts-nocheck
import axios from "axios";
import { statusHandle } from "../../utils/statusHandle";
import { DashboardDataForm } from "@/utils/databaseForm";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const handleDashboard = {
  createDashboard: async (data) => {
    const serverData=DashboardDataForm(data);
    try {
      const res = await axios.post(
        "http://localhost:8080/dashboard/create/working/dashboard",
        serverData,
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  getDashboardData:async (dash_id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/dashboard/give/data/client?dashId=${dash_id}`,
        headerForm
      );
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  }
};
