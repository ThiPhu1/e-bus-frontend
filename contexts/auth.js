const { createContext, useContext, useState, useEffect } = require("react");

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [user, setUser] = useState();

    // useEffect(()=>{
    //     console.log("user",user);
    // },[user])

    return (
        <AuthContext.Provider
            value={{
                user, setUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuthContext = () => useContext(AuthContext);