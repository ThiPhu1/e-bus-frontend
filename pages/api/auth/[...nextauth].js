import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import authServices from "utils/services/auth";

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

                const signInBody = {
                    username,
                    password
                }

                const res = await authServices.signIn({ body: signInBody })
                const { status, data, response } = res;
                if (status === 200) {
                    return data;
                } else {
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
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    }
}

export default NextAuth(authOptions);