import Head from "next/head";
import { AppProps } from "next/app";
import Layout from "components/Layout";
import "styles/index.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Plinker</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
