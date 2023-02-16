import { basePost, baseGet } from "utils/api/base";
import apiEndPointList from "utils/constant/apiEndPointsList";

const ticketService = {
    getMany: async () => {
        let response = null;
        try {
            response = await baseGet({
                endpoint: apiEndPointList.ticket.GET_ALL,
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
                endpoint: apiEndPointList.ticket.GET(id),
            });
        } catch (err) {
            response = err;
        }

        return response?.data;
    },
}

export default ticketService;