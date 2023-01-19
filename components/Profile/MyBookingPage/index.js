import moment from "moment";

import styles from "./styles.module.scss";

import { useState } from "react";

import { Table } from "antd";
import { useEffect } from "react";

import getCurrencyFormat from "utils/constant/getCurrencyFormat";

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

export default function MyBookingPage({ user, tickets }) {

    const [myBookingInfo, setMyBookingInfo] = useState();

    useEffect(() => {
        const history = user?.history_purchase;
        if (history && tickets) {
            const purchasedTicketIds = history?.map((item) => item?.data_purchase?.ticket_id)
            const purchasedTicketData = purchasedTicketIds?.map((tickectId) => {
                const ticketMatch = tickets?.find((ticket) => ticket?._id === tickectId);
                if (ticketMatch) {
                    return (
                        {
                            key: ticketMatch?._id,
                            routeName: ticketMatch?.route_name?.route_name,
                            createdAt: moment(ticketMatch?.createdAt).format('h:mm - DD/MM/YYYY'),
                            expireDate: moment(ticketMatch?.ticket_expired).format('h:mm - DD/MM/YYYY'),
                            amount: getCurrencyFormat(ticketMatch?.ticket_price),
                            status: ticketMatch?.is_valid,
                        }
                    )
                } else return null;
            })

            setMyBookingInfo(purchasedTicketData);

        }
    }, [user, tickets])



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