import { useSession } from "next-auth/react";
import {useRouter} from "next/router";

export default function AuthGuard({ children }) {
    const router = useRouter();
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/sign-in");
        },
    });

    // if (status === "loading") {
    //     return "authenticating...";
    // }

    return children;

}