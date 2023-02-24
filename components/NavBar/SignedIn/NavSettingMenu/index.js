import styles from "./styles.module.scss";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { settingMenu } from "utils/constant/navbar/settingMenu";
import { signedInNavItems } from "utils/constant/navbar/signedIn";

import getCurrencyFormat from "utils/getCurrencyFormat";
import { useAuthContext } from "contexts/auth";

import { useRouter } from "next/router";
import { useMemo } from "react";

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
                    <Link href="/profile/wallet/deposit" passHref><a className={styles["wallet-deposit"]}>Nạp thêm</a></Link>
                </span>
            </div>
            <ul className={styles["nav-setting"]}>
                {
                    settingMenu?.map((item, index) =>
                        <li
                            key={index}
                            onClick={isMobile && onMenuClose}
                        >
                            <NavSettingItem item={item} />
                        </li>
                    )
                }
                {
                    isMobile &&
                    signedInNavItems?.map((item, index) => (
                        <li
                            key={index}
                            onClick={isMobile && onMenuClose}
                        >
                            <NavSettingItem item={item} />
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

const NavSettingItem = ({ item }) => {
    const { pathname } = useRouter();

    const isActive = useMemo(() => pathname?.includes(item?.pathName), [pathname]);

    return (
        <Link
            href={item?.pathName}
        >
            <a
                className={`${styles["nav-setting__item"]} ${isActive ? styles["nav-setting__item--active"] : ""}`}
                href={item?.pathName}
            >
                {item?.title}
            </a>
        </Link>
    );
}