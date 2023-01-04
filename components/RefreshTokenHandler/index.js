import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function RefreshTokenHandler({ setInterval }) {
    const {  data } = useSession();

    useEffect(() => {
        if (!!data) {
            const timeRemaining = Math.round((((data.accessExpir - process.env.NEXT_PUBLIC_REFRESH_ACCESS_TOKEN_TIME_MARGIN) - Date.now()) / 1000));
            setInterval(timeRemaining > 0 ? timeRemaining : 0);
        }
    }, [data]);

    return null;
}