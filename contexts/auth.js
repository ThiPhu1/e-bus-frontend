const { createContext, useContext, useState, useEffect } = require("react");

import { useSession, signOut } from "next-auth/react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const session = useSession();
    const [initialCheck, setInitCheck] = useState(false);

    useEffect(() => {
        console.log("session", session);
    }, [session])

    useEffect(() => {
        const { status, data } = session;

        // set init check

        if (status === "loading") {
            setInitCheck(false);
            return;
        }

        setInitCheck(true);

        if (status === "authenticated") {
        }

        // sign out if refresh token error while demanding new access token;
        if (data?.error) {
            if (data.error === "Invalid Token") {
                signOut();
            }
        }

    }, [session])

    // useEffect(() => {
    //     console.log("initcheck", initialCheck);

    // }, [initialCheck])

    return (
        <AuthContext.Provider
            value={{
                initialCheck,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);