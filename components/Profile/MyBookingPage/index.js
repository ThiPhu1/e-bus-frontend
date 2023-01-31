import moment from "moment";

import styles from "./styles.module.scss";

import { useState } from "react";

import { Table } from "antd";
import { useEffect } from "react";

import getCurrencyFormat from "utils/getCurrencyFormat";

import { orderConst } from "utils/constant/order";

import { checkout } from "utils/constant/checkout";

import { ticketConst } from "utils/constant/ticket";

const columns = [
    {
        title: "Mã số tuyến",
        dataIndex: "routeNo",
        key: "routeNo",
        width: "10%",
    },
    {
        title: "Tên tuyến",
        dataIndex: "routeName",
        key: "routeName",
        width: "30%",
    },
    {
        title: "Loại vé",
        dataIndex: "ticketType",
        key: "ticketType",
        width: "10%",
        render: (value) => {
            const ticketType = ticketConst?.type?.find((tk) => tk?.value === value);
            return ticketType?.label;
        }
    },
    {
        title: "Hình thức thanh toán",
        dataIndex: "order_type",
        key: "order_type",
        render: (value) => {
            const paymentMethod = checkout?.paymentMethods?.find((pm) => pm?.value === value);
            return paymentMethod?.title;
        }
    },
    {
        title: "Thời gian",
        dataIndex: "createdAt",
        key: "createdAt",
    },
    {
        title: "Thành tiền",
        dataIndex: "amount",
        key: "amount",
    },
    // {
    //     title: "Hạn sử dụng",
    //     dataIndex: "expireDate",
    //     key: "expireDate",
    // },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        fixed: 'right',
        width: "10%",
        filters: orderConst?.status,
        onFilter: (value, record) => record?.status == value,
        render: (value) => {
            const isActive = (value === "00");
            return <span style={{ color: `${isActive ? "green" : "red"}` }}>{orderConst?.status?.find((st) => st?.value === value)?.text}</span>
        }
    },
]

export default function MyBookingPage({ orders }) {

    const [myBookingInfo, setMyBookingInfo] = useState();

    useEffect(() => {
        console.log("orders",orders);
        const orderData = orders?.map((order) => (
            {
                key: order?._id,
                routeNo: order?.route?.route_number,
                routeName: order?.route?.route_name,
                ticketType: order?.ticket?.ticket_type,
                order_type: order?.order_type,
                amount: getCurrencyFormat(order?.ticket?.ticket_price),
                createdAt: moment(order?.createdAt).format('h:mm - DD/MM/YYYY'),
                status: order?.order_status,
            }
        ))

        setMyBookingInfo(orderData);

    }, [orders])

    return (
        <div className={styles["booking-container"]}>
            <h3 className={styles["heading"]}>Lịch sử đặt vé</h3>
            <div className={styles["table-wrapper"]}>
                <Table
                    columns={columns}
                    dataSource={myBookingInfo}
                    scroll={{
                        x: 960
                    }}
                />
            </div>
        </div>
    );
}