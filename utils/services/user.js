import { basePost, baseGet, basePut } from "api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const userService = {
    wallet: {
        get: async (accessToken) => {
            let response = null;
            try {
                response = await baseGet({
                    endpoint: apiEndPointList.user.GET_WALLET,
                    headers: {
                        "access_token": accessToken,
                    }
                });
            } catch (err) {
                response = err;
            }

            return response;
        },
        createDepositOrder: async ({ body }, accessToken) => {
            let response = null;
            try {
                response = await basePost({
                    endpoint: apiEndPointList.user.CREATE_VNPAY_WALLET_DEPOSIT_ORDER,
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
        getVnpayOrderReturn: async ({ queryString, accessToken }) => {
            let response = null;
            try {
                response = await baseGet({
                    endpoint: apiEndPointList.user.VNPAY_WALLET_DEPOSIT_ORDER_RETURN(queryString),
                    headers: {
                        "access_token": accessToken,
                    }
                });
            } catch (err) {
                response = err;
            }

            return response?.data;
        }
    }

}

export default userService;