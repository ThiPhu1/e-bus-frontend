import MyTicketPage from "components/Profile/MyTicketPage";
import ProfileLayout from "layouts/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import getEntityByUserId from "utils/getEntityByUserId";

import ticketService from "utils/services/ticket";

export default function MyTicket({ tickets }) {

    useEffect(() => {
        console.log("tickets", tickets);
    }, [tickets])

    return <MyTicketPage tickets={tickets} />;
}

MyTicket.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}

export async function getServerSideProps(ctx) {
    const session = await unstable_getServerSession(ctx.req, ctx.res, authOptions);

    const res = await ticketService.getMany(session?.accessToken);

    if (!res?.tickets) {
        return {
            props: {
                tickets: [],
            }
        }
    }

    const ticketListByUserId = getEntityByUserId(res?.tickets, session?.user?._id)

    return {
        props: {
            tickets: ticketListByUserId,
        }
    }
}

