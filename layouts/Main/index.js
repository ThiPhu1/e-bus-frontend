import Navbar from "components/NavBar";
import Footer from "components/Footer";
import styles from "./styles.module.scss";

export default function MainLayout({ children, noFooter }) {
    return (
        <div className={"container-fluid"}>
            <Navbar />
            <div className={styles["main-wrapper"]}>
                <main>
                    {children}
                </main>
            </div>
            {!noFooter && <Footer/>}
        </div>
    );
}