import { useState } from "react";
import FilterSection from "./FilterSection";
import SearchBar from "./SearchBar";

import RouteCard from "./RouteCard";

import styles from "./styles.module.scss";

import { Empty } from "antd";

export default function RoutePage({ routes }) {
    const [routeList, setRouteList] = useState(routes);

    return (
        <div className={`${styles["home-container"]} container`}>
            {/* <FilterSection /> */}
            <div className={styles["main-section"]}>
                <SearchBar setRouteList={setRouteList} />
                <div className={styles["route-list-wrapper"]}>
                    <ul className={styles["route"]}>
                        {
                            routeList?.length > 0
                                ? routeList?.map((route, index) => {
                                    return (
                                        <li className={styles["route__item"]} key={index}>
                                            <RouteCard route={route} />
                                        </li>
                                    );
                                })
                                : <Empty description="Không có dữ liệu"/>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}