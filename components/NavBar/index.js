import Image from "next/image";
import Link from "next/link";

import DefaultSecondaryNav from "./Default";
import SignedInSecondaryNav from "./SignedIn";

import { useAuthContext } from "contexts/auth";
import { useSession } from "next-auth/react";

import styles from "./styles.module.scss";

import useWindowDimensions from "utils/useWindowDimension";
import { useState, useEffect } from "react";

import { MenuOutlined } from "@ant-design/icons";
import { Drawer } from "antd";

export default function Navbar() {
    const { initialCheck } = useAuthContext();
    const { data } = useSession();

    const dimension = useWindowDimensions();

    const [isMobile, setIsMobile] = useState();

    useEffect(() => {
        if (dimension) {
            setIsMobile(dimension?.width < 576)
        }
    }, [dimension])

    const [showMenu, setMenuState] = useState(false);

    const onMenuBtnClick = () => {
        setMenuState(true);
    }

    const onMenuClose = () => {
        setMenuState(false);
    }

    return (
        <div className={styles["navbar-wrapper"]}>
            <div className={styles["navbar"]}>
                <div className={styles["navbar__left"]}>
                    <Link
                        href="/"
                        passHref
                    >
                        <a >
                            <Image
                                src="/common/main_logo.png"
                                alt="main_logo"
                                height={73}
                                width={150}
                            />
                        </a>
                    </Link>
                </div>
                <div className={styles["navbar__right"]}>
                    <div className={styles["navbar__right-container"]}>
                        {
                            isMobile
                                ? <>
                                    <span className={styles["navbar__menu-btn"]} onClick={onMenuBtnClick}><MenuOutlined /></span>
                                    <Drawer
                                        placement="right"
                                        open={showMenu}
                                        onClose={onMenuClose}
                                        width={"50%"}
                                    >
                                        {
                                            !initialCheck
                                                ? <></>
                                                : data?.user
                                                    ? <SignedInSecondaryNav user={data?.user} isMobile={isMobile} onMenuClose={onMenuClose} />
                                                    : <DefaultSecondaryNav isMobile={isMobile} onMenuClose={onMenuClose} />
                                        }
                                    </Drawer>
                                </>
                                : <>
                                    {
                                        !initialCheck
                                            ? <></>
                                            : data?.user
                                                ? <SignedInSecondaryNav user={data?.user} />
                                                : <DefaultSecondaryNav />
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}