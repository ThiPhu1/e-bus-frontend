import MainLayout from "layouts/Main";
import routeService from "utils/services/route";

import CheckoutPage from "components/Checkout";

export default function Checkout({ route }) {
    return (
        <CheckoutPage
            route={route}
        />
    );
}

Checkout.getLayout = function getLayout(page) {
    return (
        <MainLayout>{page}</MainLayout>
    );
}

export async function getServerSideProps(ctx) {
    const { id } = ctx.query;

    const res = await routeService.get(id);

    return {
        props: {
            route: res?.route,
        }
    }
}
