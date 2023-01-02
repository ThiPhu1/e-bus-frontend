const { createContext, useContext, useState, useEffect } = require("react");

import { useSession } from "next-auth/react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const session = useSession();
    const [user, setUser] = useState();
    const [apiToken, setApiToken] = useState({ accessToken: "", refreshToken: "" });
    const [initialCheck,setInitCheck] = useState(false);

    useEffect(() => {
        console.log("session", session);
    }, [session])

    useEffect(() => {
        const { status } = session;

        // set init check

        if (status === "loading") {
            setInitCheck(false);
            return;
        }
        
        setInitCheck(true);
        
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

    useEffect(()=>{
        console.log("initcheck",initialCheck);
    },[initialCheck])

    return (
        <AuthContext.Provider
            value={{
                initialCheck,
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