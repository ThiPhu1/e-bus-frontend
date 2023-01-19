import { basePost, baseGet } from "api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const orderService = {
    create: async ({ queryString, body }, accessToken) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.order.CREATE(queryString),
                body,
                headers: {
                    "access_token": accessToken,
                }
            });
        } catch (err) {
            response = err;
        }

        return response?.data;
    },
    getVnpayOrderReturn: async ({ queryString }) => {
        let response = null;
        try {
            response = await baseGet({
                endpoint: apiEndPointList.order.VNPAY_ORDER_RETURN(queryString),
            });
        } catch (err) {
            response = err;
        }

        return response?.data;
    }
}

export default orderService;