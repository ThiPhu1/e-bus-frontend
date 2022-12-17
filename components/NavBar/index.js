import Image from "next/image";
import Link from "next/link";

import { Button } from "antd";

import styles from "./styles.module.scss";

export default function NavBar() {
    return (
        <div className={styles["navbar-wrapper"]}>
            <div className={styles["navbar"]}>
                <div className={styles["navbar__left"]}>
                    <Link
                        href="/"
                    >
                        <a href="/">
                            <Image
                                src="/common/main_logo.png"
                                height={73}
                                width={150}
                            />
                        </a>
                    </Link>
                </div>
                <div className={styles["navbar__right"]}>
                    <div className={styles["navbar__right-container"]}>
                        <Link
                            href="/sign-in"
                        >
                            <Button type="text" size="large">Đăng nhập</Button>
                        </Link>
                        <Link
                            href="/sign-up"
                        >
                            <Button type="primary" size="large">Đăng kí</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}