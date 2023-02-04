import styles from "./styles.module.scss";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { settingMenu } from "utils/constant/navbar/settingMenu";
import { signedInNavItems } from "utils/constant/navbar/signedIn";

import { useSession } from "next-auth/react";
import getCurrencyFormat from "utils/getCurrencyFormat";
import { useAuthContext } from "contexts/auth";

export default function NavSettingMenu({ isMobile, onMenuClose }) {
    const { userWallet } = useAuthContext();

    const onSignOutBtnCLick = () => {
        signOut();
    }

    return (
        <div className={styles["nav-setting-wrapper"]}>
            <div className={styles["user-wallet-info"]}>
                <span className={styles["user-wallet-info__title"]}>Số dư tài khoản</span>
                <span className={styles["user-wallet-info__amount"]}>
                    <span>{getCurrencyFormat(userWallet?.balance)}</span>
                    <Link href="/profile/wallet" passHref><a className={styles["wallet-deposit"]}>Nạp thêm</a></Link>
                </span>
            </div>
            <ul className={styles["nav-setting"]}>
                {
                    settingMenu?.map((item, index) =>
                        <li
                            className={styles["nav-setting__item"]}
                            key={index}
                            onClick={isMobile && onMenuClose}

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
                {
                    isMobile &&
                    signedInNavItems?.map((item, index) => (
                        <li
                            className={styles["nav-setting__item"]}
                            key={index}
                            onClick={isMobile && onMenuClose}
                        >
                            <Link
                                href={item?.pathName}
                            >
                                <a href={item?.pathName}>
                                    {item?.title}
                                </a>
                            </Link>
                        </li>
                    ))
                }
            </ul>
            <hr className={styles["divider"]} />
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