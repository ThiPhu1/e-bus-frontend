import styles from "./styles.module.scss";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { settingMenu } from "utils/constant/navbar/settingMenu";

export default function NavSettingMenu() {

    const onSignOutBtnCLick = () => {
        signOut();
    }

    return (
        <div className={styles["nav-setting-wrapper"]}>
            <ul className={styles["nav-setting"]}>
                {
                    settingMenu?.map((item, index) =>
                        <li
                            className={styles["nav-setting__item"]}
                            key={index}
                        >
                            <Link
                                href={item?.pathName}
                            >
                                <a href={item?.pathName}>
                                    {item?.title}
                                </a>
                            </Link>
                        </li>
                    )
                }
            </ul>
            <hr className={styles["divider"]}/>
            <a
                type="button"
                className={styles["sign-out-btn"]}
                onClick={onSignOutBtnCLick}
            >
                Đăng xuất
            </a>
        </div>
    );
}