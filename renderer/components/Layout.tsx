import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>フォームアプリケーション</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </>
);

export default Layout;
