import moment from "moment";

import styles from "./styles.module.scss";

import { useState, useEffect } from "react";

import { InputNumber, Button, notification } from "antd";
import userServices from "utils/services/user";

import { useSession } from "next-auth/react";

export default function MyWalletPage() {
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
            const res = await userServices.deposit({ body }, sessionData?.accessToken);
            if (res.status === 200) {
                if (res?.data?.success) {
                    api.success({
                        message: "Success",
                        description: res.data?.message,
                    });
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
                    <div className={styles["input-field"]}>
                        <label className={styles["label"]}>Mệnh giá</label>
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
                    </div>
                    <Button
                        type="primary"
                        onClick={handleDeposit}
                        disabled={isNaN(value) || value == null || value === 0}
                        loading={isLoading}
                    >
                        Nạp tiền
                    </Button>
                </div>
            </div>
            {contextHolder}
        </>
    );
}