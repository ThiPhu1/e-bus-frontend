const { createContext, useContext, useState, useEffect } = require("react");

import { useSession, signOut } from "next-auth/react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const session = useSession();
    const [user, setUser] = useState();
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
            const { data: { user } } = session;
            if (user) {
                setUser(user);
                return;
            }
        }

        // sign out if refresh token error while demanding new access token;
        if (data?.error) {
            if (data.error === "Invalid token") {
                setUser(null);
                signOut();
            }
        }

        setUser(null);
    }, [session])

    useEffect(() => {
        console.log("initcheck", initialCheck);

    }, [initialCheck, user])

    return (
        <AuthContext.Provider
            value={{
                initialCheck,
                user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);