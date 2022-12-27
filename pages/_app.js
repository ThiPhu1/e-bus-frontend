import "../styles/global.scss";

import AntdStylesConfig from "components/AntdStylesConfig";

import AuthProvider from "contexts/auth";

function Layout({ Component, pageProps }) {
  const getLayout = Component.getLayout || (({ page }) => page)

  return (
    <AuthProvider>
      <AntdStylesConfig>
        {getLayout(<Component {...pageProps} />)}
      </AntdStylesConfig>
    </AuthProvider>
  );
}

Layout.propTypes = {};
export default Layout;
