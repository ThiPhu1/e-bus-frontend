import MyTicketPage from "components/Profile/MyTicketPage";
import ProfileLayout from "layouts/Profile";

export default function MyTicket() {

    return <MyTicketPage />;
}

MyTicket.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}

