import MainLayout from "layouts/Main";

import { useAuthContext } from "contexts/auth"
import { useEffect } from "react";

export default function RouteDetail(){
    const {user} = useAuthContext();

    useEffect(()=>{
        console.log("user",user);
    },[user])

    return(
        <h1>route detail</h1>
    )
}

RouteDetail.getLayout = function getLayout(page) {
    return (
      <MainLayout>{page}</MainLayout>
    );
  }
  