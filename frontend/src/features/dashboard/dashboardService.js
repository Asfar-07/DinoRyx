// @ts-nocheck
import axios from "axios";
import { statusHandle } from "../../utils/statusHandle";
import { DashboardDataForm } from "@/utils/databaseForm";
import { data } from "react-router-dom";

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
      throw e;
    }
  }
};


export const handleStudent ={
  getStudentData:async(dash_id)=>{
     try {
      const res = await axios.get(
        `http://localhost:8080/dashboard/student/data?dashID=${dash_id}`,
        headerForm
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },

  createStudentData:async(newdata,dash_id)=>{
    newdata.dashboardId=dash_id;
    newdata.progressStatus="starting"
    try {
      const res = await axios.post(
        "http://localhost:8080/dashboard/student/inset",
        newdata,
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  updateStudentData:async(updateData)=>{
     try {
      const res = await axios.put(
        "http://localhost:8080/dashboard/student/update",
        updateData,
        headerForm,
      );
      console.log(res.data)
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  deleteStudentData:async(student_id,dash_id)=>{
     try {
      const res = await axios.delete(
        `http://localhost:8080/dashboard/student/remove/${dash_id}/${student_id}`,
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
}
export const handlePayment={
  collectPayment:async(dash_id)=>{
     try {
      const res = await axios.get(
        `http://localhost:8080/dashboard/fetch/payment/record?dashID=${dash_id}`,
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  savePayment:async(data)=>{
    try {
      const res = await axios.post(
        "http://localhost:8080/dashboard/save/payment/record",
        data,
        headerForm,
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
