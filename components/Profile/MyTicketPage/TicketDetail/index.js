import styles from "./styles.module.scss";
import Image from "next/image";
import { useMemo } from "react";
import moment from "moment";

export default function TicketDetail({ data }) {
    const ticketInfo = useMemo(() => {
        return [
            {
                title: "Tuyến",
                value: data?.route?.route_number,
            },
            {
                title: "Tên tuyến",
                value: data?.route?.route_name,
            },
            {
                title: "Ngày mua",
                value: moment(data?.createdAt).format('h:mm - DD/MM/YYYY'),
            },
        ]
    }, [data])

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
            <ul className={styles["ticket-detail__info"]}>
                {
                    ticketInfo?.map((item, index) => {
                        return <li
                            className={styles["ticket-detail__info-item"]}
                            key={index}
                        >
                            <span className={styles["ticket-detail__info-item-title"]}>{item?.title}</span>
                            <span className={styles["ticket-detail__info-item-value"]}>{item?.value}</span>
                        </li>
                    })
                }
            </ul>
            <hr />
            <span className={styles["ticket-detail__notify"]}>Vui lòng xuất trình mã QR khi tham gia phương tiện</span>
        </div>
    );
}