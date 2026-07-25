import axios from "axios";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const handleLocation= {
    getAllLocation:async()=>{
         try {
              const res = await axios.get(
                "http://localhost:8080/dashboard/get/all/location",
                headerForm,
              );
              return res.data;
            } catch (e) {
              console.error(e);
              throw e;
            }
    }
}