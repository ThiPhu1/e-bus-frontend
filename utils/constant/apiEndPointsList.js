const apiEndPointList = {
    auth: {
        SIGN_IN: "/api/auth/login",
        SIGN_UP: "/api/auth/register",
        REFRESH_ACCESS_TOKEN: "/api/order",
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
        GET_ALL : "/api/order",
        CREATE: (queryString) => `/api/order/create${queryString}`,
        VNPAY_ORDER_RETURN: (queryString) => `/api/order/vnpay-return${queryString}`,
    }
}

export default apiEndPointList;