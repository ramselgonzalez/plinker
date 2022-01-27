import Head from "next/head";
import { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import Layout from "components/Layout";
// global styles
import "styles/reset.css";
import "styles/global.css";
// component styles
import "styles/component-character-select.css";
import "styles/component-container.css";
import "styles/component-layout.css";
import "styles/component-move-preview.css";
import "styles/component-row.css";
import "styles/component-secondary-header.css";
import "styles/component-stat-section.css";
import "styles/component-tree-view.css";
import "styles/component-typography.css";
// page styles
import "styles/page-assists.css";
import "styles/page-home.css";
import "styles/page-moves.css";
import "styles/page-overview.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps, router } = props;
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
