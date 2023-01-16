import moment from "moment";

import styles from "./styles.module.scss";

import { useState } from "react";

import { Table } from "antd";
import { useEffect } from "react";

const columns = [
    {
        title: "Tuyến",
        dataIndex: "routeName",
        key: "routeName",
    },
    {
        title: "Ngày mua",
        dataIndex: "createdAt",
        key: "createdAt",
    },
    {
        title: "Thời hạn",
        dataIndex: "expireDate",
        key: "expireDate",
    },
    {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (value) => {
            if (value === "true") {
                return <span style={{ color: "green" }}>Còn hiệu lực</span>
            } else return <span style={{ color: "red" }}>Hết hạn</span>
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
            />
        </div>
    );
}