import MyBookingPage from "components/Profile/MyBookingPage";
import ProfileLayout from "layouts/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { authOptions } from "pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import getEntityByUserId from "utils/getEntityByUserId";

// import ticketService from "utils/services/ticket";
import orderService from "utils/services/order";

export default function MyBooking({ orders }) {
    return <MyBookingPage orders={orders}/>;
}

MyBooking.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}

export async function getServerSideProps(ctx) {
    const session = await unstable_getServerSession(ctx.req,ctx.res,authOptions);

    const res = await orderService.getMany(session?.accessToken);
    if(!res?.orders){
        return {
            props: {
                orders: [],
            }
        }
    }

    const orderListByUserId = getEntityByUserId(res?.orders,session?.user?._id)

    return {
        props: {
            orders: orderListByUserId?.reverse(),
        }
    }
}

