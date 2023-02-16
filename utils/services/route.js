import { basePost, baseGet } from "utils/api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const routeService = {
    getMany: async (query) => {
        let response = null;
        try {
            response = await baseGet({
                endpoint: apiEndPointList.route.GET_ALL(query),
            });
        } catch (err) {
            response = err;
        }

        return response?.data;
    },
    get: async (id) => {
        let response = null;
        try {
            response = await baseGet({
                endpoint: apiEndPointList.route.GET(id),
            });
        } catch (err) {
            response = err;
        }

        return response?.data;
    },
}

export default routeService;