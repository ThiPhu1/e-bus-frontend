import styles from "./styles.module.scss";

import Link from "next/link";

import { settingMenu } from "utils/constant/navbar/settingMenu";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfileSidebar() {

    return (
        <div className={styles["sidebar-wrapper"]}>
            <ul className={styles["sidebar"]}>
                {
                    settingMenu?.map((item, index) => {
                        return <ProfileSidebarItem key={index} item={item} />
                    })
                }
            </ul>
        </div>
    );
}

const ProfileSidebarItem = ({ item }) => {
    const router = useRouter();

    const [isActive, setActiveState] = useState();

    useEffect(() => {
        setActiveState(router.pathname.includes(item?.pathName))
    }, [router.pathname])
    return (
        <li
            className={`${styles["sidebar__item"]} ${isActive ? styles["sidebar__item--active"] : ""}`}
        >
        <Link
                href={item?.pathName}
                passHref
            >
                <a>
                    <span className={styles["sidebar__item-icon"]}>
                        {item?.icon}
                    </span>
                    <span>{item?.title}</span>
                </a>
            </Link>
        </li>
    );
}