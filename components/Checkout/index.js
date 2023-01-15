import { useState } from "react";
import styles from "./styles.module.scss";

import { checkout } from "utils/constant/checkout";
import { Button, Radio, Space } from 'antd';
export default function CheckoutPage({ route }) {

    const [routeInfo] = useState([
        {
            title: "Tuyến số",
            value: route?.route_number,
        },
        {
            title: "Tên tuyến",
            value: route?.route_name,
        },
        {
            title: "Thời gian hoạt động",
            value: `${route?.time_start?.hours}:${route?.time_start?.minutes} - ${route?.time_end?.hours}:${route?.time_end?.minutes}`,
        },
    ]);

    const [paymentMethod, setPaymentMethod] = useState(checkout?.methods[0]?.value);

    const onPaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    }

    return (
        <div className={styles["chekout-container"]}>
            <div className={`${styles["route-info-card"]} ${styles["info-container"]}`}>
                <h3 className={styles["heading"]}>Thông tin vé đặt</h3>
                <ul className={styles["route-info"]}>
                    {
                        routeInfo?.map((item, index) => {
                            return <li
                                className={styles["route-info__item"]}
                                key={index}
                            >
                                <span className={styles["route-info__item-title"]}>{item?.title}:</span>
                                <span className={styles["route-info__item-value"]}>{item?.value}</span>
                            </li>
                        })
                    }
                </ul>
            </div>
            <div className={`${styles["payment-card"]} ${styles["info-container"]}`}>
                <div>
                    <h3 className={styles["heading"]}>Phương thức thanh toán</h3>
                    <div className={styles["payment-method-checkbox"]}>
                        <Radio.Group onChange={onPaymentMethodChange} value={paymentMethod}>
                            <Space direction="vertical">
                                {
                                    checkout?.methods?.map((item, index) => {
                                        return <Radio
                                            key={index}
                                            value={item?.value}
                                            disabled={!item?.isActive}
                                            checked={item?.default}
                                        >
                                            {item?.title}
                                        </Radio>
                                    })
                                }
                            </Space>
                        </Radio.Group>
                    </div>
                </div>
                <div>
                    <h3 className={styles["heading"]}>Thông tin thanh toán</h3>
                    <ul className={styles["payment-info"]}>
                        <li
                            className={styles["payment-info__item"]}
                        >
                            <span className={styles["payment-info__item-title"]}>Đơn giá</span>
                            <span className={styles["payment-info__item-value"]}>{`${route?.route_price} VND`}</span>
                        </li>
                        <li
                            className={styles["payment-info__item"]}
                        >
                            <span className={styles["payment-info__item-title"]}>Phí giao dịch</span>
                            <span className={styles["payment-info__item-value"]}>Miễn phí</span>
                        </li>
                        <li
                            className={`${styles["payment-info__item"]} ${styles["payment-info__item--total"]}`}
                        >
                            <span className={styles["payment-info__item-title"]}>Tổng cộng</span>
                            <span className={styles["payment-info__item-value"]}>{`${route?.route_price} VND`}</span>
                        </li>
                    </ul>

                </div>
                <Button type="primary" htmlType="submit" size="large" block>
                    Mua vé
                </Button>
            </div>
        </div>
    );
}