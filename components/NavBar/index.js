import Image from "next/image";
import Link from "next/link";

import DefaultSecondaryNav from "./Default";
import SignedInSecondaryNav from "./SignedIn";

import { useAuthContext } from "contexts/auth";

import styles from "./styles.module.scss";

export default function Navbar() {
    const { initialCheck, user } = useAuthContext();

    return (
        <div className={styles["navbar-wrapper"]}>
            <div className={styles["navbar"]}>
                <div className={styles["navbar__left"]}>
                    <Link
                        href="/route"
                    >
                        <Image
                            src="/common/main_logo.png"
                            height={73}
                            width={150}
                        />
                    </Link>
                </div>
                <div className={styles["navbar__right"]}>
                    <div className={styles["navbar__right-container"]}>
                        {
                            !initialCheck
                                ? <></>
                                : user
                                    ? <SignedInSecondaryNav user={user} />
                                    : <DefaultSecondaryNav />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}