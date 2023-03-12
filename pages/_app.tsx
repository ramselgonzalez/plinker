// packages
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";
import { AppProps } from "next/app";
// components
import Layout from "components/Layout";
import MarkdownComponents from "components/Markdown";
// universal styles
import "styles/index.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Plinker</title>
      </Head>
      <Layout>
        <MDXProvider components={MarkdownComponents}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </>
  );
}
