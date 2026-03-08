//@ts-nocheck
import { statusHandle } from "../../utils/statusHandle";
import { UserDataForm } from "../../utils/databaseForm";
import { apiConnection } from "@/app/api";


export const handleUser = {
    isUser: async ()=>{
      try {
      const res = await apiConnection.get(
        "/user/data/me",
      );
      return res.data;
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  fetchuser: async ()=>{
      try {
      const res = await apiConnection.get(
        "/user/data/account",
      );
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  updateUser: async (data) => {
    try {
      const res = await apiConnection.put(
        "/user/data/update",
        UserDataForm(data), //Structured data and only sending edited data
      );
      statusHandle.statusInfo(res.status)
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
  removeUser: async() => {
     try {
      const res = await apiConnection.delete(
        "/user/data/delete/account",
      );
      statusHandle.statusInfo(res.status)
      return res.data;
    } catch (e) {
      console.error(e);
      statusHandle.statusInfo(e.response.status);
      throw e;
    }
  },
};
