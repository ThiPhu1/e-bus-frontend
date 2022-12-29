import MainLayout from "layouts/Main";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
  const { data } = useSession();
  console.log(useSession());
//   useEffect(() => {
// console.log("data",JSON.stringify(data.user, null, 2));
//   }, [])

  return (
    <h1>hello world</h1>
  )
}

HomePage.getLayout = function getLayout(page) {
  return (
    <MainLayout>{page}</MainLayout>
  );
}


