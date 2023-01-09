import MainLayout from "layouts/Main";
import { useEffect } from "react";

export default function Home() {

  return <></>
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>{page}</MainLayout>
  );
}
