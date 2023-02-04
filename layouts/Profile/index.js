import ProfileSidebar from "./Sidebar";
import Navbar from "components/NavBar";
import Footer from "components/Footer";

import styles from "./styles.module.scss";

export default function ProfileLayout({ children }) {
    return (
        <div className={"container-fluid"}>
            <Navbar />
            <div className={styles["profile-container"]}>
                <main className={styles["main-wrapper"]}>
                    {/* <ProfileSidebar /> */}
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}