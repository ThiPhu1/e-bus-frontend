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
        CREATE: (params) => `/api/order/create?${params}`,
        VNPAY_ORDER_RETURN: `/api/order/vnpay-order-return`,
    }
}

export default apiEndPointList;