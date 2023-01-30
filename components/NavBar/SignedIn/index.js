import Link from "next/link";
import { Button, Avatar } from "antd";

import { signedInNavItems } from "utils/constant/navbar/signedIn";

import { UserOutlined } from '@ant-design/icons';
import NavSettingMenu from "./NavSettingMenu";

import styles from "./styles.module.scss";

export default function SignedInSecondaryNav({ user }) {
    return (
        <div className={styles["nav-wrapper"]}>
            <ul className={styles["nav-list"]}>
                {
                    signedInNavItems?.map((item, index) => (
                        <li
                            className={styles["nav-list__item"]}
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
                    ))
                }
            </ul>
            <div className={styles["nav-user"]}>
                {/* <span className={styles["greeting"]}>Xin chào, {user?.username}</span> */}
                <Avatar
                    icon={<UserOutlined />}
                />
                <div className={styles["nav-setting-container"]}>
                    <NavSettingMenu />
                </div>
            </div>
        </div>
    );
}