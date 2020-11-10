import { CssBaseline, GeistProvider } from "@geist-ui/react";
import Head from "next/head";
import { Footer, Header } from "./organisms";

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GeistProvider>
        <CssBaseline />
        <Header component={children} />
        <Footer />
      </GeistProvider>
    </>
  );
};
