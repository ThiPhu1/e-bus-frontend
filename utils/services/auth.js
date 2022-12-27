import { basePost } from "api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const authServices = {
    signIn: async ({ body }) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.SIGN_IN,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    }
}

export default authServices;