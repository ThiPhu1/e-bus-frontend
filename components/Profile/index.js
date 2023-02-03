import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import getCurrencyFormat from "utils/getCurrencyFormat";

export default function ProfilePage({ user }) {
    const [profileInfo, setProfileInfo] = useState();

    useEffect(() => {
        setProfileInfo([
            {
                title: "Tên tài khoản",
                value: user?.username,
            },
            {
                title: "Tên người dùng",
                value: user?.fullname,
            },
            {
                title: "Số điện thoại",
                value: user?.phoneNumber,
            },
        ])
    }, [user])

    return (
        <div className={styles["profile-container"]}>
            <h3 className={styles["heading"]}>Tài khoản của tôi</h3>
            <ul className={styles["profile-info"]}>
                {
                    profileInfo?.map((item, index) => {
                        return <li
                            className={styles["profile-info__item"]}
                            key={index}
                        >
                            <span className={styles["profile-info__item-title"]}>{item?.title}</span>
                            <span className={styles["profile-info__item-value"]}>{item?.value}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}