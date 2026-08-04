import axios from "axios";

const headerForm = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const handleLocation= {
    getAllLocation:async()=>{
         try {
              const res = await axios.get(
                `${backendUrl}/dashboard/get/all/location`,
                headerForm,
              );
              return res.data;
            } catch (e) {
              console.error(e);
              throw e;
            }
    }
}