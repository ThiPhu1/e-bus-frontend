const { createContext, useContext, useState, useEffect } = require("react");

import getUserWallet from "utils/getUserWallet";
import { useSession, signOut } from "next-auth/react";
const AuthContext = createContext();

const AuthProvider = (props) => {
    const session = useSession();
    const [initialCheck, setInitCheck] = useState(false);

    const [userWallet, setWallet] = useState({ balance: 0 });

    // useEffect(() => {
    //     console.log("session", session);
    // }, [session])

    useEffect(() => {
        const { status, data } = session;

        // set init check

        if (status === "loading") {
            setInitCheck(false);
            return;
        }

        setInitCheck(true);

        if (status === "authenticated") {
            updateUserWallet(data?.accessToken);
        }

        // sign out if refresh token error while demanding new access token;
        if (data?.error) {
            if (data.error === "Invalid Token") {
                signOut();
            }
        }

    }, [session])



    const updateUserWallet = async (accessToken) => {
        const userWalletRes = await getUserWallet({ accessToken });
        setWallet({balance: userWalletRes ? userWalletRes : 0});
    }

    return (
        <AuthContext.Provider
            value={{
                initialCheck,
                userWallet,
                updateUserWallet,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);