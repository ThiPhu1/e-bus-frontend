import { Card, Button } from "antd";
import styles from "./styles.module.scss";

import Link from "next/link";

export default function RouteCard({ route }) {

    return (
        <Link
            href={`/route/${route?.id}`}
        >
            <a href={`/route/${route?.id}`}>
                <Card>
                    <div className={styles["route-card"]}>
                        <div className={styles["route-card__left"]}>
                            <h3 className={styles["route-title"]}>
                                {route?.route_name}
                            </h3>

                            <div className={styles["route-duration"]}>
                                <span>{route?.time_start?.hours}</span>:<span>{route?.time_start?.minutes}</span><span>{route?.time_end?.hours}</span>:<span>{route?.time_end?.minutes}</span>
                            </div>
                        </div>
                        <div className={styles["route-card-divider"]}></div>
                        <div className={styles["route-card__right"]}>
                            <div className={styles["route-price"]}>
                                <span>Giá vé từ</span>
                                <span>{route?.route_price} VND</span>
                            </div>
                            <Button type="primary" size="large" block>Đặt vé</Button>
                        </div>
                    </div>
                </Card>
            </a>
        </Link>
    );
}