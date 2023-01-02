import MainLayout from "layouts/Main";
import { useEffect } from "react";

import { useAuthContext } from "contexts/auth";

export default function HomePage() {
  const { user, apiToken } = useAuthContext();

  useEffect(()=>{
    console.log(user, apiToken);
  },[user,apiToken])

  return (
    <h1>hello world</h1>
  )
}

HomePage.getLayout = function getLayout(page) {
  return (
    <MainLayout>{page}</MainLayout>
  );
}
