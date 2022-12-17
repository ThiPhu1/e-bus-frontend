import "../styles/global.scss";

import AntdStylesConfig from "components/AntdStylesConfig";

function Layout({ Component, pageProps }) {
  const getLayout = Component.getLayout || (({ page }) => page)

  return (
    <AntdStylesConfig>
        {getLayout(<Component {...pageProps} />)}
    </AntdStylesConfig>
  );
}

Layout.propTypes = {};
export default Layout;
