import ProfilePage from "components/Profile";
import ProfileLayout from "layouts/Profile";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
    const { data: sessionData } = useSession();

    const [user,setUser] = useState();

    useEffect(() => {
        if(sessionData){
            setUser(sessionData?.user)
        }
    }, [sessionData])

    return <ProfilePage user={user} />;
}

Profile.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>{page}</ProfileLayout>
    );
}
