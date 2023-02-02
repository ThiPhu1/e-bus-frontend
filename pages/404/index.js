import Link from "next/link";
import { Button } from "antd";
import styles from "./styles.module.scss";

export default function Custom404() {
    return (
        <div className={styles["main-wrapper"]}>
            <div className={styles["main-container"]}>
                <h1>404</h1>
                <Link href="/">
                    <Button type="primary">Trở về trang chủ</Button>
                </Link>
            </div>
        </div>
    );
}

Custom404.getLayout = function getLayout(page) {
    return (
        <>{page}</>
    );
}