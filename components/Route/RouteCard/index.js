import { Card, Button } from "antd";
import styles from "./styles.module.scss";

import Link from "next/link";

export default function RouteCard({ route }) {

    return (
        <Link
            href={`/route/${route?._id}`}
        >
            <a href={`/route/${route?._id}`}>
                <Card>
                    <div className={styles["route-card"]}>
                        <div className={styles["route-card__left"]}>
                            <div className={styles["route-name"]}>
                                {
                                    route?.route_number
                                        ? <>
                                            <h3 className={styles["route-title"]}>
                                                {`Tuyến số ${route?.route_number}`}
                                            </h3>
                                            <span className={styles["route-subtitle"]}>{route?.route_name}</span>
                                        </>
                                        : <h3 className={styles["route-title"]}>
                                            {route?.route_name}
                                        </h3>
                                }
                            </div>
                            <div className={styles["route-duration"]}>
                                <span className={`${styles["route-time"]} ${styles["route-time--start"]}`}>
                                    <span>{route?.time_start?.hours}</span>:<span>{route?.time_start?.minutes}</span>
                                </span>
                                <span className={`${styles["route-time"]} ${styles["route-time--end"]}`}>
                                    <span>{route?.time_end?.hours}</span>:<span>{route?.time_end?.minutes}</span>
                                </span>
                            </div>
                        </div>
                        <div className={styles["route-card-divider"]}></div>
                        <div className={styles["route-card__right"]}>
                            <div className={styles["route-price"]}>
                                <span>Giá vé từ</span>
                                <span className={styles["price"]}>{route?.route_price} VND</span>
                            </div>
                            <Button type="primary" size="large" block>Đặt vé</Button>
                        </div>
                    </div>
                </Card>
            </a>
        </Link>
    );
}