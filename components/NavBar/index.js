import Image from "next/image";
import Link from "next/link";

import DefaultSecondaryNav from "./Default";
import SignedInSecondaryNav from "./SignedIn";

import { useAuthContext } from "contexts/auth";
import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";

export default function Navbar() {
    const { initialCheck } = useAuthContext();
    const { data } = useSession();

    return (
        <div className={styles["navbar-wrapper"]}>
            <div className={styles["navbar"]}>
                <div className={styles["navbar__left"]}>
                    <Link
                        href="/route"
                        passHref
                    >
                        <a >
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
                            !initialCheck
                                ? <></>
                                : data?.user
                                    ? <SignedInSecondaryNav user={data?.user} />
                                    : <DefaultSecondaryNav />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}