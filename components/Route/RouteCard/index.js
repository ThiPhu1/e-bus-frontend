import { Card, Button } from "antd";
import { DownOutlined } from '@ant-design/icons';
import styles from "./styles.module.scss";

import { useRouter } from "next/router";
import { useState } from "react";

import CardDetail from "./CardDetail";

import getCurrencyFormat from "utils/getCurrencyFormat";

export default function RouteCard({ route }) {
    const router = useRouter();
    const [detailExpand, setDetailExpand] = useState(false);

    const onRouteDetailBtnClick = (e) => {
        setDetailExpand((prev) => !prev);
    }

    const onBookBtnClick = () => {
        router.push(`/checkout/${route?._id}`);
    }

    return (
        <Card>
            <div className={styles["route-card"]}>
                <div className={styles["route-card__top"]}>
                    <div className={styles["route-card__top-left"]}>
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
                                <span><span>{route?.time_start?.hours}</span>:<span>{route?.time_start?.minutes}</span></span>
                            </span>
                            <span className={styles["route-time-offset"]}>
                                <span className={styles["arrow"]} spacing={`${route?.route_spacing} phút/chuyến`}/>
                            </span>
                            <span className={`${styles["route-time"]} ${styles["route-time--end"]}`}>
                                <span><span>{route?.time_end?.hours}</span>:<span>{route?.time_end?.minutes}</span></span>
                            </span>
                        </div>
                    </div>
                    {/* <div className={styles["route-card-divider"]}></div> */}
                    <div className={styles["route-card__top-right"]}>
                        <div className={styles["route-price"]}>
                            <span>Giá vé từ</span>
                            <span className={styles["price"]}>{`${getCurrencyFormat(route?.route_price)}`}</span>
                        </div>
                        <Button type="primary" size="large" block onClick={onBookBtnClick}>Đặt vé</Button>
                    </div>
                </div>
                <div className={styles["route-card__bottom"]}>
                    <button
                        className={styles["route-detail-btn"]}
                        onClick={onRouteDetailBtnClick}
                    >
                        {`${route?.stations?.length} Trạm`}
                        <DownOutlined
                            style={{ fontSize: '12px', paddingLeft: '4px' }}
                            rotate={detailExpand ? 180 : 0}
                        />
                    </button>
                    <CardDetail isActive={detailExpand} route={route} />
                </div>
            </div>
        </Card>
    );
}