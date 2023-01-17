import axios from "axios";

const host = process.env.NEXT_PUBLIC_HOST;

// const axiosClient = axios.create({
//     baseURL: host,
// });

const vnPayService = {
    createOrder: ({ body }) => {
        return axios.post("/api/vnpay/create-order", body);
    }
}

export default vnPayService;