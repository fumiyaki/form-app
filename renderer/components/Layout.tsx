import { ReactNode } from "react";
import Head from "next/head";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Head>
      <title>フォームアプリケーション</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
  </LocalizationProvider>
);

export default Layout;
