import { basePost, baseGet } from "api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const checkoutService = {
    createOrder: async ({ body }) => {
        let response = null;

        try {
            response = await basePost({
                endpoint: apiEndPointList.checkout.CREATE_ORDER,
                body,
            });
        } catch (err) {
            response = err;
        }

        return response;
    }
}

export default checkoutService;