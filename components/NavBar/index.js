import Image from "next/image";
import Link from "next/link";

import { Button } from "antd";

import { useAuthContext } from "contexts/auth";

import { signOut } from "next-auth/react";

import styles from "./styles.module.scss";

export default function NavBar() {
    const { user } = useAuthContext();

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
                        {
                            user
                                ? <>
                                    <Button onClick={() => { signOut() }}>Sign out</Button>
                                </>
                                : <>
                                    <Link
                                        href="/sign-in"
                                    >
                                        <a href="/sign-in">
                                            <Button type="text" size="large">Đăng nhập</Button>
                                        </a>
                                    </Link>
                                    <Link
                                        href="/sign-up"
                                    >
                                        <a href="/sign-up">
                                            <Button type="primary" size="large">Đăng kí</Button>
                                        </a>
                                    </Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}