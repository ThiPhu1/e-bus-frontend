import styles from "../styles.module.scss";
import { useEffect, useState } from "react";
import getCurrencyFormat from "utils/constant/getCurrencyFormat";

import orderService from "utils/services/order";

import { Button } from 'antd';

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CheckoutCard({ itemInfo }) {
    const router = useRouter();
    const { data: sessionData } = useSession();

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        console.log("sessionData", sessionData);
    }, [sessionData])

    const handleCheckout = async () => {
        setLoading(true);
        if (itemInfo) {
            const { paymentService, orderType, routeId, ticketType } = itemInfo;
            const body = { ...paymentService, orderType: orderType };
            const queryString = `?routeId=${routeId}&ticketType=${ticketType}`;
            // console.log("click", body, params);

            const res = await orderService?.create({ body, queryString }, sessionData?.accessToken);
            if (res?.success) {
                router.push(res.url);
            }
        }
        setLoading(false);
        return;
    }

    return (
        <div className={`${styles["payment-card"]} ${styles["info-container"]}`}>

            <div>
                {/* <h3 className={styles["heading"]}>Thông tin thanh toán</h3> */}
                <ul className={styles["payment-info"]}>
                    <li
                        className={styles["payment-info__item"]}
                    >
                        <span className={styles["payment-info__item-title"]}>Đơn giá</span>
                        <span className={styles["payment-info__item-value"]}>{`${getCurrencyFormat(itemInfo?.amount)}`}</span>
                    </li>
                    {/* <li
                        className={styles["payment-info__item"]}
                    >
                        <span className={styles["payment-info__item-title"]}>Phí giao dịch</span>
                        <span className={styles["payment-info__item-value"]}>Miễn phí</span>
                    </li> */}
                    <li
                        className={`${styles["payment-info__item"]} ${styles["payment-info__item--total"]}`}
                    >
                        <span className={styles["payment-info__item-title"]}>Tổng cộng</span>
                        <span className={styles["payment-info__item-value"]}>{`${getCurrencyFormat(itemInfo?.amount)}`}</span>
                    </li>
                </ul>

            </div>
            <Button
                type="primary"
                size="large"
                block
                loading={isLoading}
                onClick={handleCheckout}
            >
                Mua vé
            </Button>
        </div>
    );
}