import styles from "./styles.module.scss";
import Image from "next/image";

export default function TicketDetail({ data }) {
    return (
        <div className={styles["ticket-detail"]}>
            <div className={styles["ticket-detail__code"]}>
                <Image
                    src={data?.qr_code}
                    alt={"qr-img"}
                    width={180}
                    height={180}
                />
            </div>
            <span className={styles["ticket-detail__notify"]}>Vui lòng xuất trình mã QR khi tham gia phương tiện</span>
        </div>
    );
}