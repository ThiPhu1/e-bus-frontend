import styles from "./styles.module.scss";
import {
    SearchOutlined
} from '@ant-design/icons';

import { Form, Input, Button } from "antd";

const { Search } = Input;

export default function SearchBar() {
    return (
        <div className={styles["searchBar"]}>
            <Search
                prefix={<SearchOutlined />}
                placeholder="Tìm kiếm địa điểm"
                enterButton="Tìm kiếm"
                size="large"
                allowClear
            />
        </div>
    );
}