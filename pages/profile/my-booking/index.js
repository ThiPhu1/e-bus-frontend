import MyBookingPage from "components/Profile/MyBookingPage";
import ProfileLayout from "layouts/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import ticketService from "utils/services/ticket";

export default function MyBooking({ tickets }) {
    const { data: sessionData } = useSession();

    const [user, setUser] = useState();

    useEffect(() => {
        if (sessionData) {
            setUser(sessionData?.user)
        }
    }, [sessionData])

    return <MyBookingPage user={user} tickets={tickets}/>;
}

MyBooking.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}

export async function getServerSideProps() {

    const res = await ticketService.getMany();

    return {
        props: {
            tickets: res?.tickets,
        }
    }
}

