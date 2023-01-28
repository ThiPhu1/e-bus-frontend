import styles from "./styles.module.scss";
import orderService from "utils/services/order";

import { CloseCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";

import { Button } from "antd";
import { useEffect, useRef } from "react";

import { useRouter } from "next/router";

export default function VNPayCallback({ vnpay_result }) {
    const router = useRouter();

    const handleRouting = () => {
        // switch (vnpay_result?.success) {
        //     case true:
        //         router.push("/profile/my-booking");
        //         break;
        //     case false:
        //         router.push("/route");
        //         break;
        //     default: break;
        // }
        router.push("/profile/my-booking");
    }

    return (
        <div className={styles["transaction-callback-wrapper"]}>
            <div className={styles["transaction-callback"]}>
                <div className={styles["transaction-info"]}>
                    {
                        vnpay_result?.success
                            ? <CheckCircleTwoTone style={{fontSize: '96px'}} twoToneColor="#AACB73" />
                            : <CloseCircleTwoTone style={{fontSize: '96px'}} twoToneColor="#CD0404" />
                    }
                    <h1 className={styles["transaction-info__heading"]}>{vnpay_result?.message}</h1>
                </div>
                <Button
                    type="primary"
                    size="large"
                    block
                    onClick={handleRouting}
                >
                    {`Trở về trang chủ`}
                </Button>
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
