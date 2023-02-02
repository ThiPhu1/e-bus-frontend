import "../styles/global.scss";

import AntdStylesConfig from "components/AntdStylesConfig";

import AuthProvider from "contexts/auth";
import { SessionProvider } from "next-auth/react";
import RefreshTokenHandler from "components/RefreshTokenHandler";
import { useEffect, useState } from "react";

function Layout({ Component, pageProps }) {
  const getLayout = Component.getLayout || (({ page }) => page);

  const [interval,setInterval] = useState(0);

  // useEffect(()=>{
  //   console.log("interval",interval);
  // },[interval])

  return (
    <SessionProvider session={pageProps.session} refetchInterval={interval}>
      <AuthProvider>
        <AntdStylesConfig>
          {getLayout(<Component {...pageProps} />)}
        </AntdStylesConfig>
      </AuthProvider>
      <RefreshTokenHandler setInterval={setInterval} />
    </SessionProvider>
  );
}

Layout.propTypes = {};
export default Layout;
