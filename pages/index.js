import MainLayout from "layouts/Main";
import { useEffect } from "react";
import routeService from "utils/services/route";

import RoutePage from "components/Route";

export default function Home({ routes }) {

  return <RoutePage routes={routes} />
}

Home.getLayout = function getLayout(page) {
  return (
    <MainLayout>{page}</MainLayout>
  );
}

export async function getServerSideProps(ctx) {
  const res = await routeService.getMany();

  return {
    props: {
      routes: res?.routes ?? [],
    }
  }
}