import styles from "./styles.module.scss";

import { useState, useEffect } from "react";

import { Form, InputNumber, Button, notification } from "antd";
import userServices from "utils/services/user";

import { useSession } from "next-auth/react";
import { useAuthContext } from "contexts/auth";

export default function MyWalletPage() {
    const { updateUserWallet } = useAuthContext();
    const [api, contextHolder] = notification.useNotification();

    const { data: sessionData } = useSession();
    const [value, setValue] = useState();
    const [isLoading, setIsLoading] = useState();

    const onInputChange = (value) => {
        setValue(value);
    }

    const handleDeposit = async () => {
        if (!isNaN(value)) {
            const body = {
                wallet: value,
            }
            setIsLoading(true);
            const res = await userServices.wallet.deposit({ body }, sessionData?.accessToken);
            if (res.status === 200) {
                if (res?.data?.success) {
                    api.success({
                        message: "Success",
                        description: res.data?.message,
                    });
                    updateUserWallet(sessionData?.accessToken);
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
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={isLoading}
                            >
                                Nạp tiền
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            {contextHolder}
        </>
    );
}