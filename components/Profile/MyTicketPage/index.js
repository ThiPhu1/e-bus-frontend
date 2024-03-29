import moment from "moment";
import styles from "./styles.module.scss";

import { ticketConst } from "utils/constant/ticket";

import { Segmented, Empty, Modal, Spin } from "antd";

import { useState, useEffect, useCallback } from "react";

import TicketDetail from "./TicketDetail";

import getCurrencyFormat from "utils/getCurrencyFormat";

import ticketService from "utils/services/ticket";
import getEntityByUserId from "utils/getEntityByUserId";
import { useSession } from "next-auth/react";

import "moment/locale/vi";

export default function MyTicketPage() {
    const { data: sessionData } = useSession();
    const [currentType, setCurrentType] = useState(ticketConst?.type[0].value);
    const [ticketList, setTicketList] = useState();
    const [selectedTicket, setSelectedTicket] = useState();
    const [isFetching, setIsFetching] = useState(false);

    const checkTicketValid = (ticket) => {
        return (ticket?.ticket_expired - Date.now() > 0) && ticket?.is_valid;
    }

    const checkTicketIsUsed = (ticket) => {
        return (ticket?.ticket_expired - Date.now() > 0) && ticket?.is_valid || ticket?.tap_count < 1;
    }

    const handleTicketTypeChange = (value) => {
        setCurrentType(value);
    }

    const fetchTicketList = async (currentType) => {
        setIsFetching(true);
        const ticketList = await ticketService.getMany(sessionData?.accessToken);
        if (ticketList) {
            const ticketListByUserId = getEntityByUserId(ticketList?.tickets, sessionData?.user?._id);

            const filteredTickets = ticketListByUserId?.filter((ticket) => {
                if (ticket?.qr_code) {
                    let ticketType = ticket?.ticket_type;
                    if (!checkTicketIsUsed(ticket)) {
                        ticketType = -1;
                    }
                    else if (!checkTicketValid(ticket)) {
                        ticketType = 0;
                    }
                    if (ticketType == currentType) {
                        return ticket;
                    }
                }
            });
            setTicketList(filteredTickets);
        }
        setIsFetching(false);
        return;
    }

    useEffect(() => {
        fetchTicketList(currentType);
    }, [currentType])


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
                    isFetching
                        ? <div className={styles["loading"]}><Spin /></div>
                        : ticketList?.length > 0
                            ? <ul className={styles["ticket-list"]}>
                                {
                                    ticketList?.map((ticket) => (
                                        <li
                                            // className={`${styles["ticket-list__item"]} ${checkTicketValid(ticket) ? "" : styles["is-invalid"]}`}
                                            className={`${styles["ticket-list__item"]} ${checkTicketValid(ticket) ? "" : ""}`}
                                            key={ticket?._id}
                                        >
                                            <TicketItem
                                                ticket={ticket}
                                                handleTicketClick={handleTicketClick}
                                                checkTicketValid={checkTicketValid}
                                            />
                                        </li>
                                        // <Skeleton />
                                    ))

                                }
                            </ul>
                            : <div className={styles["ticket-list--empty"]}>
                                <Empty description="Không có dữ liệu"/>
                            </div>
                }
            </div>
            <Modal
                width={"320px"}
                open={!!selectedTicket}
                onCancel={() => setSelectedTicket(null)}
                footer={null}
            >
                <TicketDetail data={selectedTicket} />
            </Modal>
        </div>
    );
}

function TicketItem({ ticket, handleTicketClick, checkTicketValid }) {

    return (
        // <div className={`${styles["ticket"]}`} onClick={() => { checkTicketValid(ticket) ? handleTicketClick(ticket) : null }}>
        <div className={`${styles["ticket"]}`} onClick={() => handleTicketClick(ticket)}>
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
                        {moment(ticket?.ticket_expired).locale("vi").format('H:mm - DD/MM/YYYY')}
                    </span>
                </div>
            </div>
            <div className={styles["ticket__right"]}>
                <div className={styles["ticket-field-info"]}>
                    <span className={styles["ticket-field-info__label"]}>
                        Giá tiền
                    </span>
                    <span className={styles["ticket-field-info__value"]}>
                        {getCurrencyFormat(ticket?.ticket_price)}
                    </span>
                </div>
                {
                    ticket?.ticket_type === 2 &&
                    <div className={styles["ticket-field-info"]}>
                        <span className={styles["ticket-field-info__label"]}>
                            Số lần sử dụng
                        </span>
                        <span className={styles["ticket-field-info__value"]}>
                            {ticket?.tap_count}
                        </span>
                    </div>
                }
            </div>
        </div>
    );
}