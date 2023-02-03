import styles from "../styles.module.scss";
import { useEffect, useState } from "react";
import getCurrencyFormat from "utils/getCurrencyFormat";

import orderService from "utils/services/order";

import { Button } from 'antd';

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { WalletOutlined } from "@ant-design/icons";

import Link from "next/link";
import Image from "next/image";

export default function CheckoutCard({ itemInfo }) {
    const router = useRouter();
    const { data: sessionData } = useSession();

    const [isLoading, setLoading] = useState({ status: false });
    const handleCheckout = async ({ orderType }) => {
        setLoading({ status: true, type: orderType });
        if (itemInfo) {
            const { paymentService, routeId, ticketType } = itemInfo;
            const body = { ...paymentService, orderType };
            const queryString = `?routeId=${routeId}&ticketType=${ticketType}`;

            const res = await orderService?.create({ body, queryString }, sessionData?.accessToken);
            if (res?.success) {
                switch (orderType) {
                    case 1:
                        router.push(res.url);
                        break;
                    case 2:
                        const transactionCode = res?.code;
                        router.push(`/checkout/transaction-result?code=${transactionCode}`)
                        break;
                    default:
                        break;
                }
            }
        }
        setLoading({ status: false });
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
            <div className={styles["checkout-buttons"]}>
                <div className={styles["checkout-wallet"]}>
                    <div className={styles["wallet-info"]}>
                        <span className={styles["wallet-info__balance"]}>{`Số dư hiện tại: ${getCurrencyFormat(sessionData?.user?.wallet)}`}</span>
                        {sessionData?.user?.wallet < itemInfo?.amount  && <Link href="/profile/wallet" passHref><a className={styles["wallet-info__deposit"]}>Nạp thêm</a></Link>}
                    </div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<WalletOutlined />}
                        ghost
                        loading={isLoading?.status && isLoading?.type === 2 ? true : false}
                        disabled={sessionData?.user?.wallet < itemInfo?.amount || isLoading?.status && isLoading?.type !== 2 ? true : false}
                        onClick={() => handleCheckout({ orderType: 2 })}
                    >
                        Thanh toán bằng số dư ví
                    </Button>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<span className={styles["button-icon"]}><Image src="/common/icon-vnpay.svg" width={16} height={16} objectFit="contain" /></span>}
                    ghost
                    loading={isLoading?.status && isLoading?.type === 1 ? true : false}
                    disabled={isLoading?.status && isLoading?.type !== 1 ? true : false}
                    onClick={() => handleCheckout({ orderType: 1 })}
                >
                    Thanh toán bằng ví điện tử VNPay
                </Button>
            </div>
        </div>
    );
}