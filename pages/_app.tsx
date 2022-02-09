import Head from "next/head";
import { AppProps } from "next/app";
import Layout from "components/Layout";
import { capsizeStyles } from "components/Typography";
// global styles
import "styles/reset.css";
import "styles/global.css";
// component styles
import "styles/component-character-select.css";
import "styles/component-chip.css";
import "styles/component-container.css";
import "styles/component-data-item.css";
import "styles/component-layout.css";
import "styles/component-list-item.css";
import "styles/component-move-preview.css";
import "styles/component-radio-button.css";
import "styles/component-row.css";
import "styles/component-secondary-header.css";
import "styles/component-stat-section.css";
import "styles/component-tree-view.css";
import "styles/component-typography.css";
// page styles
import "styles/pages/trials.css";
import "styles/pages/assists.css";
import "styles/pages/home.css";
import "styles/pages/move.css";
import "styles/pages/moves.css";
import "styles/pages/overview.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <>
      <Head>
        <title>Plinker</title>
        <style>
          {capsizeStyles.h1}
          {capsizeStyles.h2}
          {capsizeStyles.h3}
          {capsizeStyles.h4}
          {capsizeStyles.subheading1}
          {capsizeStyles.body1}
          {capsizeStyles.body2}
        </style>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
