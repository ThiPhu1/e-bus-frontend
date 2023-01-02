const { createContext, useContext, useState, useEffect } = require("react");

import { useSession } from "next-auth/react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const session = useSession();
    const [user, setUser] = useState();
    const [apiToken, setApiToken] = useState({ accessToken: "", refreshToken: "" });

    useEffect(() => {
        console.log("session", session);
    }, [session])

    useEffect(() => {
        const { status } = session;

        if (status === "loading") {
            return;
        }

        if (status === "authenticated") {
            const { data: { user } } = session;
            if (user) {
                setUser(user?.user);
                setApiToken({ accessToken: user?.accessToken, refreshToken: user?.refreshToken });
                return;
            }
        }

        setUser(null);
        setApiToken(null);
    }, [session])

    return (
        <AuthContext.Provider
            value={{
                user,
                apiToken,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);