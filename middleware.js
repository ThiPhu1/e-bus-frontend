import withAuth from "next-auth/middleware";

export default withAuth(
    function middleware(req){
        console.log("token in middleware", req.nextauth.token);
    },
    {
        callbacks: {
            authorized(token){
                console.log("token in authorized",token);
                return token?.user;
            }
        }
    }
);

// include protected route
export const config = {matcher: ["/checkout/:path*"]};