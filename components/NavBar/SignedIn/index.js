import { Button, Avatar } from "antd";

import { signedInNavItems } from "utils/constant/navbar/signedIn";

import { UserOutlined } from '@ant-design/icons';
import NavSettingMenu from "./NavSettingMenu";

import styles from "./styles.module.scss";

import NavItem from "./NavSettingMenu/NavItem";

export default function SignedInSecondaryNav({ user, isMobile, onMenuClose }) {
    return (
        <div className={styles["nav-wrapper"]}>
            {
                !isMobile &&
                <ul className={styles["nav-list"]}>
                    {
                        signedInNavItems?.map((item, index) => (
                            <li
                                
                                key={index}
                            >
                                <NavItem item={item} />
                            </li>
                        ))
                    }
                </ul>
            }
            <div className={styles["nav-user"]}>
                <span className={styles["greeting"]}>{user?.username}</span>
                {
                    !isMobile && <Avatar
                        icon={<UserOutlined />}
                    />
                }
                <div className={styles["nav-setting-container"]}>
                    <NavSettingMenu isMobile={isMobile} onMenuClose={onMenuClose} />
                </div>
            </div>
        </div>
    );
}