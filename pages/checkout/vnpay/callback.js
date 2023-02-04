import styles from "../styles.module.scss";
import orderService from "utils/services/order";

import { Button, Result } from "antd";
import { useRouter } from "next/router";
import walletConst from "utils/constant/wallet";
import userService from "utils/services/user";

import { unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { useMemo } from "react";

// const redirectTimeOut = 5;
export default function VNPayCallback({ vnpay_result, orderType }) {
    const router = useRouter();

    const handleRouting = (pathname) => {
        router.push(pathname);
    }

    const renderButtons = useMemo(() => {
        switch (orderType) {
            case "ticket_buy":
                return [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => handleRouting("/profile/my-ticket")}
                    >
                        {`Vé của tôi`}
                    </Button>,
                    <Button
                        // type="secondary"
                        key="secondary"
                        onClick={() => handleRouting("/")}
                    >
                        Về trang chủ
                    </Button>,
                ];
            case "wallet_deposit":
                return [
                    <Button
                        type="primary"
                        key="primary"
                        onClick={() => handleRouting("/")}
                    >
                        Về trang chủ
                    </Button>,
                ]
        }
    }, [orderType])

    // const [redirectTO,setRedirectTO] = useState(redirectTimeOut);

    // useEffect(()=>{
    //     const to = setTimeout(()=>{
    //         if(redirectTO < 0) {
    //             handleRouting("/profile/my-booking");
    //             return;
    //         }

    //         setRedirectTO(prev => prev-=1);
    //     },1000)

    //     return () => clearTimeout(to);
    // },[redirectTO])

    return (
        <div className={styles["transaction-callback-wrapper"]}>
            <div className={styles["transaction-callback"]}>
                <Result
                    status={vnpay_result?.success ? "success" : "error"}
                    title={vnpay_result?.message}
                    extra={renderButtons}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

    const { query } = ctx;
    const { orderPattern } = walletConst;

    const orderId = query["vnp_TxnRef"];
    const queryString = `?${Object.keys(query)?.map((key) => (`${key}=${encodeURIComponent(query[key])}`)).join("&")}`;

    let res, orderType;
    if (orderId.includes(orderPattern)) {
        res = await userService.wallet.getVnpayOrderReturn({ queryString, accessToken: session?.accessToken });
        orderType = "wallet_deposit";
    } else {
        res = await orderService.getVnpayOrderReturn({ queryString });
        orderType = "ticket_buy";
    }

    return {
        props: {
            vnpay_result: res,
            orderType,
        }
    }
}

VNPayCallback.getLayout = function getLayout(page) {
    return page;
}
