// @ts-nocheck
import { toast } from "react-toastify";

export const statusHandle = {
  statusInfo: (status) => {
    switch (status) {
      case 200:
        toast.success("success");
        break;
        case 401:
        toast.error("Unauthorized");
        break;
        case 404:
        toast.error("Invalid Email");
        break;
        case 409:
        toast.error("Email Already Exited");
        break;
      default:
        toast.error("Somethig Wrong");
    }
  },
};
