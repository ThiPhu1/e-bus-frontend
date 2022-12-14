import MainLayout from "layouts/Main";

export default function HomePage() {
  return (
    <h1>hello world</h1>
  )
}

HomePage.getLayout = function getLayout(page) {
  return (
    <MainLayout>{page}</MainLayout>
  );
}


