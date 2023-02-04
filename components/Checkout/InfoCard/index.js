import { useEffect, useState } from "react";
import styles from "../styles.module.scss";

export default function InfoCard({ route, itemInfo, checkoutConst }) {

    const [routeInfo, setRouteInfo] = useState([]);

    useEffect(()=>{
        setRouteInfo([
            {
                title: "Tuyến số",
                value: route?.route_number,
            },
            {
                title: "Tên tuyến",
                value: route?.route_name,
            },
            {
                title: "Thời gian hoạt động",
                value: `${route?.time_start?.hours}:${route?.time_start?.minutes} - ${route?.time_end?.hours}:${route?.time_end?.minutes}`,
            },
            {
                title: "Đơn vị vận tải",
                value: route?.route_agencies?.mgtunit_name,
            },
            {
                title: "Loại vé",
                value: checkoutConst?.ticketTypes?.find((ck) => ck?.value === itemInfo?.ticketType)?.title
            },
        ])
    },[itemInfo])

    return (
        <div className={`${styles["route-info-card"]} ${styles["info-container"]}`}>
            <h3 className={styles["heading"]}>Thông tin vé đặt</h3>
            <ul className={styles["route-info"]}>
                {
                    routeInfo?.map((item, index) => {
                        return <li
                            className={styles["route-info__item"]}
                            key={index}
                        >
                            <span className={styles["route-info__item-title"]}>{item?.title}</span>
                            <span className={styles["route-info__item-value"]}>{item?.value}</span>
                        </li>
                    })
                }
            </ul>
        </div>
    );
}