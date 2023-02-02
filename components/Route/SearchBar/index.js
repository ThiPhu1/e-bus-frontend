import styles from "./styles.module.scss";
import {
    SearchOutlined
} from '@ant-design/icons';

import { Form, Input, Button } from "antd";

import routeService from "utils/services/route";
import {useState} from "react";

export default function SearchBar({ setRouteList }) {
    const [isSearching,setIsSearching] = useState(false);

    const onSearchInput = async (e) => {
        setIsSearching(true);
        const searchVal = e.target.value?.trim();
        const query = searchVal ? `?route_number=${searchVal}` : null;
        const res = await routeService.getMany(query)

        setRouteList(res?.routes ? res.routes : []);
        setIsSearching(false);
    }

    return (
        <div className={styles["searchBar"]}>
            <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm tuyến xe"
                size="large"
                allowClear
                onChange={onSearchInput}
            />
        </div>
    );
}