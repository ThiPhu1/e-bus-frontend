import moment from "moment";

import styles from "./styles.module.scss";

import { useState } from "react";

import { Table } from "antd";
import { useEffect } from "react";

import getCurrencyFormat from "utils/getCurrencyFormat";

import { ticketConst } from "utils/constant/ticket";

const columns = [
    {
        title: "Tuyến",
        dataIndex: "routeName",
        key: "routeName",
        width: "30%",
    },
    {
        title: "Thành tiền",
        dataIndex: "amount",
        key: "amount",
    },
    {
        title: "Ngày mua",
        dataIndex: "createdAt",
        key: "createdAt",
    },
    {
        title: "Hạn sử dụng",
        dataIndex: "expireDate",
        key: "expireDate",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        fixed: 'right',
        width: "10%",
        filters: ticketConst?.status,
        onFilter: (value, record) => record?.status == value,
        render: (value) => {
            const isActive = value;
            return <span style={{ color: `${isActive ? "green" : "red"}` }}>{ticketConst?.status?.find((st) => !!st?.value === isActive)?.text}</span>
        }
    },
]

export default function MyBookingPage({ orders }) {

    const [myBookingInfo, setMyBookingInfo] = useState();

    useEffect(() => {
        const orderData = orders?.map((order) => (
            {
                key: order?._id,
                routeName: order?.route?.route_name,
                createdAt: moment(order?.createdAt).format('h:mm - DD/MM/YYYY'),
                expireDate: moment(order?.ticket?.ticket_expired).format('h:mm - DD/MM/YYYY'),
                amount: getCurrencyFormat(order?.ticket?.ticket_price),
                status: order?.ticket?.is_valid,
            }
        ))

        setMyBookingInfo(orderData);

    }, [orders])

    return (
        <div className={styles["booking-container"]}>
            <h3 className={styles["heading"]}>Lịch sử mua vé</h3>
            <Table
                columns={columns}
                dataSource={myBookingInfo}
                scroll={{
                    x: 960
                }}
            />
        </div>
    );
}