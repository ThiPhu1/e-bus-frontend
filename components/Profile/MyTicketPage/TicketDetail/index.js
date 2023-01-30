import styles from "./styles.module.scss";

export default function TicketDetail({ data }) {
    return (
        <img src={data?.qr_code} alt="" />
    );
}