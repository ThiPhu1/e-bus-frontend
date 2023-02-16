import { basePost, baseGet } from "utils/api/base";
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
    },
    signUp: async ({ body }) => {
        // console.log("body", body);
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.SIGN_UP,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
    refreshAccessToken: async (refreshToken) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.auth.REFRESH_ACCESS_TOKEN,
                headers: {
                    "refresh_token": refreshToken,
                }
            });
        } catch (err) {
            response = err;
        }

        return response;
    }
}

export default authServices;