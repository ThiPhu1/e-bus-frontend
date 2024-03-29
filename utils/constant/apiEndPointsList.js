const apiEndPointList = {
    auth: {
        SIGN_IN: "/api/auth/login",
        SIGN_UP: "/api/auth/register",
        REFRESH_ACCESS_TOKEN: "/api/auth/refresh-token",
    },
    route: {
        GET_ALL : (searchQuery) => searchQuery ? `/api/route/${searchQuery}` : `/api/route`,
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
    },
    user: {
        GET_WALLET: "/api/user/wallet/get",
        CREATE_VNPAY_WALLET_DEPOSIT_ORDER: "/api/user/wallet/deposit/create",
        VNPAY_WALLET_DEPOSIT_ORDER_RETURN: (queryString) => `/api/user/wallet/deposit/vnpay-return${queryString}`,
    }
}

export default apiEndPointList;