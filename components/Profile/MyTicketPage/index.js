import moment from "moment";
import styles from "./styles.module.scss";

import { ticketConst } from "utils/constant/ticket";

import { Segmented, Empty, Skeleton, Modal } from "antd";

import { useState, useEffect } from "react";

import TicketDetail from "./TicketDetail";

export default function MyTicketPage({ tickets }) {

    const [currentType, setCurrentType] = useState(ticketConst?.type[0].value);
    const [ticketList, setTicketList] = useState();

    const [selectedTicket, setSelectedTicket] = useState();

    const handleTicketTypeChange = (value) => {
        setCurrentType(value);
    }

    useEffect(() => {
        console.log("selectedTicket", selectedTicket);
    }, [selectedTicket])

    useEffect(() => {
        if (tickets && tickets?.length > 0) {
            console.log("tickets", tickets);
            const filterdTickets = tickets?.filter((ticket) => ticket?.qr_code && ticket?.ticket_type == currentType);
            setTicketList(filterdTickets);
        }
        return;
    }, [tickets, currentType])

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
    }

    return (
        <div className={styles["main-container"]}>
            <h3 className={styles["heading"]}>Vé của tôi</h3>
            <div className={styles["ticket-container"]}>
                <div className={styles["ticket-type-switch"]}>
                    <Segmented
                        size={`large`}
                        options={ticketConst?.type}
                        value={currentType}
                        onChange={handleTicketTypeChange}
                    />
                </div>
                {
                    tickets?.length > 0
                        ? <ul className={styles["ticket-list"]}>
                            {
                                ticketList?.map((ticket) => (
                                    <li
                                        className={`${styles["ticket-list__item"]} ${ticket?.is_valid ? "" : styles["is-invalid"]}`}
                                        key={ticket?._id}
                                    >
                                        <TicketItem
                                            ticket={ticket}
                                            handleTicketClick={handleTicketClick}
                                        />
                                    </li>
                                    // <Skeleton />
                                ))

                            }
                        </ul>
                        : <div className={styles["ticket-list--empty"]}>
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        </div>
                }
            </div>
            <Modal
                open={!!selectedTicket}
                onCancel={() => setSelectedTicket(null)}
                footer={null}
            >
                <TicketDetail data={selectedTicket} />
            </Modal>
        </div>
    );
}

function TicketItem({ ticket, handleTicketClick }) {

    return (
        <div className={`${styles["ticket"]}`} onClick={() => { handleTicketClick(ticket) }}>
            <div className={styles["ticket__left"]}>
                <div className={styles["ticket-field-info"]}>
                    <span className={styles["ticket-field-info__label"]}>
                        Tuyến
                    </span>
                    <span className={styles["ticket-field-info__value"]}>
                        {ticket?.route?.route_number}
                    </span>
                </div>
                <div className={styles["ticket-field-info"]}>
                    <span className={styles["ticket-field-info__label"]}>
                        Hiệu lực
                    </span>
                    <span className={styles["ticket-field-info__value"]}>
                        {moment(ticket?.ticket_expired).format('h:mm - DD/MM/YYYY')}
                    </span>
                </div>
            </div>
            <div className={styles["ticket__right"]}>

            </div>
        </div>
    );
}