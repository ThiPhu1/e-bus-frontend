import orderService from "utils/services/order";

export default function VNPayCallback() {
    return (
        <p>callback</p>
    );
}

export async function getServerSideProps(ctx) {
    const { query } = ctx;

    const res = await orderService.getVnpayOrderReturn();
    console.log("vnpay return", res);

    return {
        props: {
            route: "res?.route",
        }
    }
}

VNPayCallback.getLayout = function getLayout(page) {
    return page;
}
