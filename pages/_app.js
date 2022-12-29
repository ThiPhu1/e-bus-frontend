import "../styles/global.scss";

import AntdStylesConfig from "components/AntdStylesConfig";

import AuthProvider from "contexts/auth";
import { SessionProvider } from "next-auth/react";

function Layout({ Component, pageProps }) {
  const getLayout = Component.getLayout || (({ page }) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <AntdStylesConfig>
          {getLayout(<Component {...pageProps} />)}
        </AntdStylesConfig>
      </AuthProvider>
    </SessionProvider>
  );
}

Layout.propTypes = {};
export default Layout;
