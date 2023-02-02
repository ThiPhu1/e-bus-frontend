import Link from "next/link";
import { Button } from "antd";
import styles from "./styles.module.scss";

export default function Custom500() {
    return (
        <div className={styles["main-wrapper"]}>
            <div className={styles["main-container"]}>
                <h1>500</h1>
                <p>Lỗi hệ thống</p>
                <Link href="/">
                    <Button type="primary">Trở về trang chủ</Button>
                </Link>
            </div>
        </div>
    );
}

Custom500.getLayout = function getLayout(page) {
    return (
        <>{page}</>
    );
}