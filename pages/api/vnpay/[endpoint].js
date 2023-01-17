import moment from "moment";
import QueryString from "qs";

import crypto from "crypto"

let Buffer = require('buffer/').Buffer;

let tmnCode = process.env.NEXT_PUBLIC_VNP_TMNCODE;
let secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECRET;
let vnpUrl = process.env.NEXT_PUBLIC_VNP_URL;
let returnUrl = process.env.NEXT_PUBLIC_VNP_RETURNURL;

const createOrder = async (req, res, next) => {
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let createDate = moment().format('yyyyMMDDHHmmss');
    let transactionDuration = 10; // minute
    // let exprireDate = moment().add(10, 'm').format('yyyyMMDDHHmmss');
    let { amount, bankCode, orderDescription, orderType, locale } = req.body

    try {
        if (locale === null || locale === '') {
            locale = 'vn';
        }

        let orderId = moment().format('HHmmss');
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        // vnp_Params['vnp_Merchant'] = ''
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = orderDescription;
        vnp_Params['vnp_OrderType'] = orderType;
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = "172.0.0.1";
        vnp_Params['vnp_CreateDate'] = createDate;
        // vnp_Params['vnp_ExpireDate'] = exprireDate;
        if (bankCode !== null && bankCode !== '') {
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);


        let signData = QueryString.stringify(vnp_Params, { encode: false });
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 

        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + QueryString.stringify(vnp_Params, { encode: false });

        return res.status(200).json({ url: vnpUrl });
    } catch (e) {
        throw new Error(e.message)
    }
}
// 
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

export default function handler(req, res) {
    const { endpoint } = req.query;
    // console.log("endpooint",endpoint, res);
    switch (endpoint) {
        case "create-order": return createOrder(req, res);
    }

}