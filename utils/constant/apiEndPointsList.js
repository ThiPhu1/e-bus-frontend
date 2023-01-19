const apiEndPointList = {
    auth: {
        SIGN_IN: "/api/auth/login",
        SIGN_UP: "/api/auth/register",
        REFRESH_ACCESS_TOKEN: "/api/ticket",
    },
    route: {
        GET_ALL : "/api/route",
        GET: (id) => `/api/route/${id}`,
    },
    ticket: {
        GET_ALL : "/api/ticket",
        GET: (id) => `/api/ticket/${id}`,
    },
    order: {
        CREATE: (queryString) => `/api/order/create${queryString}`,
        VNPAY_ORDER_RETURN: (queryString) => `/api/order/vnpay-order-return${queryString}`,
    }
}

export default apiEndPointList;