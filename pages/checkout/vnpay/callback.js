import styles from "../styles.module.scss";
import orderService from "utils/services/order";

import { Button, Result } from "antd";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

// const redirectTimeOut = 5;
export default function VNPayCallback({ vnpay_result }) {
    const router = useRouter();

    const handleRouting = (pathname) => {
        router.push(pathname);
    }

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
                    extra={[
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
                            onClick={() => handleRouting("/route")}
                        >
                            Về trang chủ
                        </Button>,
                    ]}
                />
            </div>
        </div>
    );
}

export async function getServerSideProps(ctx) {
    const { query } = ctx;

    const queryString = `?${Object.keys(query)?.map((key) => (`${key}=${encodeURIComponent(query[key])}`)).join("&")}`;
    const res = await orderService.getVnpayOrderReturn({ queryString });

    console.log("vnpayReter", res);

    return {
        props: {
            vnpay_result: res,
        }
    }
}

VNPayCallback.getLayout = function getLayout(page) {
    return page;
}
