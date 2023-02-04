import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

import styles from "./styles.module.scss";

export default function NavItem({ item }) {
    const { pathname } = useRouter();

    const isActive = useMemo(()=> pathname?.includes(item?.pathName),[pathname]);
    
    return (
        <Link
            href={item?.pathName}
            passHref
        >
            <a
                className={`${styles["nav-list__item"]} ${isActive ? styles["nav-list__item--active"] : ""}`}
            >
                {item?.title}
            </a>
        </Link>
    );

}