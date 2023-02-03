import styles from "../styles.module.scss";

import { Radio, Space } from 'antd';

// import { useSession } from "next-auth/react";
// import getCurrencyFormat from "utils/getCurrencyFormat";

export default function OptionsCard({ route, itemInfo, updateIntemInfo, checkoutConst }) {
    // const { data: sessionData } = useSession();

    const onTicketTypeChange = (e) => {
        updateIntemInfo(e.target.name, e.target.value);

        switch (e.target.value) {
            case 1:
                updateIntemInfo("amount", route?.route_price);
                break;
            case 2:
                updateIntemInfo("amount", 50000);
                break;
            default: break;
        }
    }

    // const onPaymentMethodChange = (e) => {
    //     updateIntemInfo(e.target.name, e.target.value);
    // }

    return (
        <div className={`${styles["options-card"]}`}>
            <div className={`${styles["info-container"]}`}>
                <h3 className={styles["heading"]}>Chọn loại vé</h3>
                <div className={styles["payment-method-checkbox"]}>
                    <Radio.Group name="ticketType" onChange={onTicketTypeChange} value={itemInfo?.ticketType}>
                        <Space direction="vertical">
                            {
                                checkoutConst?.ticketTypes?.map((item, index) => {
                                    return <Radio
                                        key={index}
                                        value={item?.value}
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
            {/* <div className={`${styles["info-container"]}`}>
                <h3 className={styles["heading"]}>Chọn phương thức thanh toán</h3>
                <div className={styles["payment-method-checkbox"]}>
                    <Radio.Group name="orderType" onChange={onPaymentMethodChange} value={itemInfo?.orderType}>
                        <Space direction="vertical">
                            {
                                checkoutConst?.paymentMethods?.map((item, index) => {
                                    return <Radio
                                        key={index}
                                        value={item?.value}
                                        disabled={!item?.isActive}
                                        checked={item?.default}
                                    >
                                        <div style={{display:"flex",gap:"32px"}}>
                                            <span>{item?.title}</span>
                                            {item?.value === 2 && <span>{getCurrencyFormat(sessionData?.user?.wallet)}</span>}
                                        </div>
                                    </Radio>
                                })
                            }
                        </Space>
                    </Radio.Group>
                </div>
            </div> */}
        </div>
    );
}