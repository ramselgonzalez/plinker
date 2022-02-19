import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import { capsizeStyles } from "components/Typography";
import routes from "routes";
// global styles
import "styles/reset.css";
import "styles/global.css";
// component styles
import "styles/components/bottom-navigation.css";
import "styles/components/character-select.css";
import "styles/components/chip.css";
import "styles/components/container.css";
import "styles/components/data-item.css";
import "styles/components/drawer.css";
import "styles/components/layout.css";
import "styles/components/list-item.css";
import "styles/components/move-preview.css";
import "styles/components/radio-button.css";
import "styles/components/row.css";
import "styles/components/secondary-header.css";
import "styles/components/stat-section.css";
import "styles/components/tree.css";
import "styles/components/typography.css";
// page styles
import "styles/pages/trials.css";
import "styles/pages/assists.css";
import "styles/pages/home.css";
import "styles/pages/move.css";
import "styles/pages/moves.css";
import "styles/pages/overview.css";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
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
        <AnimatePresence>
          <Component key={router.pathname} {...pageProps} />
        </AnimatePresence>
      </Layout>
    </>
  );
}
