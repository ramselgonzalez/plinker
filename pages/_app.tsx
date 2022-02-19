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
  const [direction, setPage] = useState(0);
  const router = useRouter();
  const cid = router.query.cid as string;

  function handleSwipe(newDirection: number) {
    if (newDirection > 0) {
      if (router.route === routes.overview()) {
        router.push(routes.moves(cid));
      }
      if (router.route === routes.moves()) {
        router.push(routes.assists(cid));
      }
    }

    if (newDirection < 0) {
      if (router.route === routes.moves()) {
        router.push(routes.overview(cid));
      }
      if (router.route === routes.assists()) {
        router.push(routes.moves(cid));
      }
    }
    setPage(newDirection);
  }

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
        <AnimatePresence custom={direction}>
          <Component key={router.pathname} {...pageProps} handleSwipe={handleSwipe} custom={direction} />
        </AnimatePresence>
      </Layout>
    </>
  );
}
