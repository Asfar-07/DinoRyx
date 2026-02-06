import axios from "axios";
import { statusHandle } from "../../utils/statusHandle";
import { UserDataForm } from "../../utils/databaseForm";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const handleUser = {
  fetchuser: async ()=>{
      try {
      const res = await axios.get(
        "http://localhost:8081/user/data/checkme",
        headerForm,
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
      const res = await axios.put(
        "http://localhost:8081/user/data/update",
        UserDataForm(data), //Structured data and only sending edited data
        headerForm,
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
      const res = await axios.delete(
        "http://localhost:8081/user/data/delete/account",
        headerForm,
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
