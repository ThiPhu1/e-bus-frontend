import styles from "./styles.module.scss";

import { useState, useEffect } from "react";

import { Form, InputNumber, Button, notification } from "antd";
import userService from "utils/services/user";

import { useSession } from "next-auth/react";
import { useAuthContext } from "contexts/auth";

import { useRouter } from "next/router";
import { nanoid } from 'nanoid'

import walletConst from "utils/constant/wallet";

import Image from "next/image";

export default function WalletDepositPage() {
    const { orderPattern } = walletConst;
    const router = useRouter();
    const { updateUserWallet } = useAuthContext();
    const [api, contextHolder] = notification.useNotification();

    const { data: sessionData } = useSession();
    const [value, setValue] = useState();
    const [isLoading, setIsLoading] = useState();

    const onInputChange = (value) => {
        setValue(value);
    }

    const handleDeposit = async () => {
        const orderID = `${orderPattern}${nanoid()}`;

        if (!isNaN(value)) {
            const body = {
                orderId: orderID,
                bankCode: "",
                orderDescription: `Deposit wallet`,
                locale: "vn",
                amount: value,
            }
            setIsLoading(true);
            const res = await userService.wallet.createDepositOrder({ body }, sessionData?.accessToken);
            if (res.status === 200) {
                if (res?.data?.success) {
                    router.push(res?.data?.url);
                    // console.log(res.data.url)
                }
            } else {
                api.error({
                    message: "Error",
                    description: res.error,
                });
            }
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className={styles["main-container"]}>
                <h3 className={styles["heading"]}>Nạp tiền vào tài khoản</h3>
                <div className={styles["main-wrapper"]}>
                    <Form
                        name={"user-wallet-deposit"}
                        layout="vertical"
                        onFinish={handleDeposit}
                    >
                        <Form.Item
                            label={"Mệnh giá"}
                            name={"amount"}
                            rules={
                                [
                                    () => ({
                                        validator(_, value) {
                                            if (isNaN(value) || value < 0) {
                                                return Promise.reject(new Error('Mệnh giá không phù hợp!'));
                                            } else if (value < 10000) {
                                                return Promise.reject(new Error('Mệnh giá tối thiểu 10.000đ'));
                                            }
                                            return Promise.resolve();
                                        }
                                    })
                                ]
                            }
                        >
                            <InputNumber
                                style={{ width: "100%" }}
                                placeholder="10.000"
                                formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                value={value}
                                onChange={onInputChange}
                                min={0}
                                max={1000000000}
                            />
                        </Form.Item>
                        <Form.Item style={{paddingTop: "8px", marginBottom: 0}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                icon={<span className={styles["button-icon"]}><Image src="/common/icon-vnpay.svg" width={16} height={16} objectFit="contain" /></span>}
                                loading={isLoading}
                            >
                                Thanh toán VNPay
                            </Button>

                        </Form.Item>
                    </Form>
                </div>
            </div>
            {contextHolder}
        </>
    );
}