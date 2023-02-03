import styles from "./styles.module.scss";
import {
    SearchOutlined
} from '@ant-design/icons';

import { Form, Input, Button } from "antd";

import routeService from "utils/services/route";
import { useState, useRef } from "react";

const DONE_TYPING_DURATION = 250; //ms

export default function SearchBar({ setRouteList }) {
    const [isSearching, setIsSearching] = useState(false);
    const isTypingTimeout = useRef();
    const [inputVal, setInputVal] = useState();

    const getRoutes = async () => {
        const searchVal = inputVal?.trim();

        setIsSearching(true);
        const query = searchVal ? `?route_number=${searchVal}` : null;
        const res = await routeService.getMany(query);

        setRouteList(res.routes ? res.routes : []);
        setIsSearching(false);
    }

    const onSearchInput = (e) => {
        setInputVal(e.target.value);
    }

    const setTypingTimeout = () => {
        isTypingTimeout.current = setTimeout(() => { getRoutes() }, DONE_TYPING_DURATION)
    }

    const clearTypingTimeout = () => {
        clearTimeout(isTypingTimeout.current);
    }

    const keyDownHandle = () => {
        clearTypingTimeout();
    }

    const keyUpHandle = () => {
        clearTypingTimeout();
        setTypingTimeout();
    }

    return (
        <div className={styles["searchBar"]}>
            <Input
                prefix={<SearchOutlined />}
                placeholder="Tìm tuyến xe"
                size="large"
                allowClear
                onChange={onSearchInput}
                onKeyDown={keyDownHandle}
                onKeyUp={keyUpHandle}
                value={inputVal}
            />
        </div>
    );
}