// import { statusHandle } from "../../utils/statusHandle";
import { apiConnection } from "@/app/api";

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
    }
}