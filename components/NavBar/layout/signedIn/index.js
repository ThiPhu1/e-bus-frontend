import { Button, Avatar } from "antd";

import { UserOutlined } from '@ant-design/icons';
import NavSettingMenu from "./NavSettingMenu";

import styles from "./styles.module.scss";

export default function SignedInSecondaryNav({user}) {
    return (
        <div className={styles["nav-user"]}>
            <span className={styles["greeting"]}>Xin chào, {user?.username}</span>
            <Avatar
                icon={<UserOutlined />}
            />
            <div className={styles["nav-setting-container"]}>
                <NavSettingMenu />
            </div>
        </div>
    );
}