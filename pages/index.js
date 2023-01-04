import MainLayout from "layouts/Main";
import { useEffect } from "react";
import HomePage from "components/Home";

export default function Home() {

  return <HomePage />
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>{page}</MainLayout>
  );
}
