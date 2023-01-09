import Navbar from "components/Navbar";

import styles from "./styles.module.scss";

export default function MainLayout({ children }) {
    return (
        <div className={"container-fluid"}>
            <Navbar />
            <div className={styles["main-wrapper"]}>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}