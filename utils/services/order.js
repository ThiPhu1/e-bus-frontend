import { basePost, baseGet } from "api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const orderService = {
    create: async ({ params, body }, accessToken) => {
        let response = null;
        try {
            response = await basePost({
                endpoint: apiEndPointList.order.CREATE(params),
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
    getVnpayOrderReturn: async () => {
        let response = null;
        try {
            response = await baseGet({
                endpoint: apiEndPointList.order.VNPAY_ORDER_RETURN,
            });
        } catch (err) {
            response = err;
        }

        return response?.data;
    }
}

export default orderService;