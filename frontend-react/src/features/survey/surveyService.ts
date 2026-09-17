// import { statusHandle } from "../../utils/statusHandle";
import { apiConnection } from "@/app/api";
import type { ResponseToBack } from "@/pages/Welcome/Onboarding.types";

export const handleSurvey = {

    getQuestions: async () => {
        try {
            const res = await apiConnection.get(
                "/survey/onboarding/get/questions",
            );
            return res.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    userResponse: async ( response: ResponseToBack ) => {
        try {
            const res = await apiConnection.post(
                "/survey/onboarding/user/response",
                response
            );
            return res.data;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}