import styles from "./styles.module.scss";

export default function TicketDetail({ data }) {
    return (
        <div className={styles["ticket-detail"]}>
            <div className={styles["ticket-detail__code"]}>
                <img src={data?.qr_code} alt="" />
            </div>
            <span className={styles["ticket-detail__notify"]}>Vui lòng xuất trình mã QR khi tham gia phương tiện</span>
        </div>
    );
}