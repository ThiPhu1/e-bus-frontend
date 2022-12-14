import "../styles/global.scss";

function Layout({ Component, pageProps }) {
  const getLayout = Component.getLayout || (({ page }) => page)

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

Layout.propTypes = {};
export default Layout;
