import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import authServices from "utils/services/auth";

const refreshAccessToken = async (refreshToken) => {
    let res = await authServices.refreshAccessToken(refreshToken);
    const { status, data, response } = res;

    if (response?.data && !response?.data?.sucess) {
        res = {
            error: response?.data?.message,
        };
    }
    if(status === 200){
        return data;
    }

    return null;
}

const setExpirTime = (tokenExpire) => {
    return Date.now() + (parseInt(tokenExpire.slice(0,-1)) * 60 * 1000);
}

const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credential: {},
            async authorize(credential, req) {
                const { username, password } = credential;
                console.log("credential", credential);
                const signInBody = {
                    username,
                    password
                }

                const res = await authServices.signIn({ body: signInBody })
                const { status, data, response } = res;
                if (status === 200) {
                    return data;
                }
                else {
                    throw new Error(response?.data?.message);
                }
            },
        })
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user.user;
                token.accessToken = user.accessToken;
                token.accessExpir = setExpirTime(user.tokenExpire);
                token.refreshToken = user.refreshToken;
            }

            const shouldRefreshTime = Math.round((token.accessExpir - process.env.NEXT_PUBLIC_REFRESH_ACCESS_TOKEN_TIME_MARGIN) - Date.now());
            console.log("shouldRefreshTime", shouldRefreshTime);
            if (shouldRefreshTime > 0) {
                return token
            }

            // get new acess token
            const newToken = await refreshAccessToken(token.refreshToken);
            if(newToken?.error){
                token.error = newToken?.error;
            } else {
                token.accessToken = newToken?.accessToken;
                token.accessExpir = setExpirTime(newToken.tokenExpire);
            }

            return token;
        },
        session: async ({ session, token }) => {
            // console.log("token in session", token);
            session.user = token.user;
            session.accessToken = token.accessToken;
            session.accessExpir = token.accessExpir;
            session.error = token?.error ? token.error : null;
            return session
        }
    }
}

export default NextAuth(authOptions);