import { basePost, baseGet, basePut } from "api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const userServices = {
    deposit: async ({ body }, accessToken) => {
        let response = null;
        try {
            response = await basePut({
                endpoint: apiEndPointList.user.DEPOSIT_WALLET,
                body,
                headers: {
                    "access_token": accessToken,
                }
            });
        } catch (err) {
            response = err;
        }

        return response;
    },
}

export default userServices;