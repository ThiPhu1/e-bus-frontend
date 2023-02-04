import Link from "next/link";
import { Button } from "antd";

import styles from "./styles.module.scss";

export default function DefaultSecondaryNav({ isMobile, onMenuClose }) {
    return (
        <div className={styles["nav-wrapper"]}>
            <Link
                href="/sign-in"
            >
                <Button type="primary" ghost size="large" block={isMobile} onClick={isMobile && onMenuClose}>Đăng nhập</Button>
            </Link>
            <Link
                href="/sign-up"
            >
                <Button type="primary" size="large" block={isMobile} onClick={isMobile && onMenuClose}>Đăng kí</Button>
            </Link>
        </div>
    );
}