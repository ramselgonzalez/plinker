import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";
import { getCharacterIds, getCharacterOverview } from "lib/characters";
import { ParsedUrlQuery } from "querystring";
import Container from "components/Container";
import DataItem from "components/DataItem";
import DataRow from "components/DataRow";
import StatSectionHeader from "components/StatSectionHeader";
import StatSection from "components/StatSection";
import StatSectionFooter from "components/StatSectionFooter";
import Typography from "components/Typography";
import { ICharacterOverview } from "types";
import routes from "routes";

function getPageTitle(name: string) {
  return `${name} / Overview / Plinker`;
}

function getOpenGraphTitle(name: string) {
  return `${name} | Overview | Plinker`;
}

function getOpenGraphDescription(name: string) {
  return `Explore ${name}'s stats, playstyles and best team compositions in Ultimate Marvel vs. Capcom 3.`;
}

function getOpenGraphImage(cid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/akuma-fireball.png`;
}

function getOpenGraphyImageAlt(name: string) {
  return `A portrait of ${name}`;
}

interface OverviewProps {
  character: ICharacterOverview;
}

const Overview: NextPage<OverviewProps> = (props) => {
  const { character, ...rest } = props;
  const router = useRouter();
  const cid = router.query.cid as string;
  return (
    <>
      <Head>
        <title>{getPageTitle(character.name)}</title>
        <meta property="og:title" content={getOpenGraphTitle(character.name)} />
        <meta property="og:description" content={getOpenGraphDescription(character.name)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={getOpenGraphyImageAlt(character.name)} />
        <meta property="og:image" content={getOpenGraphImage(character.id)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container className="overview-container" {...rest}>
        <div>
          <section className="overview-header">
            <Typography gutter shadow uppercase variant="h1">
              {character.name}
            </Typography>
          </section>
          <StatSection divider>
            <StatSectionHeader>Basic Stats</StatSectionHeader>
            <DataRow label="Health" value={character.health} />
            <DataRow label="Magic Series" value={character.chainComboArchetype} />
            <DataRow label="Air Dash" value={character.airDashArchetype} />
            <DataRow label="Archetype" value={character.archetype} />
            <DataRow label="Recommended Position" value={character.recommendedPosition} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Min. Damage Scaling</StatSectionHeader>
            <div className="damage-scaling-grid">
              <DataItem label="Normal" value={character.minDmgScalingNormal} />
              <DataItem label="Special" value={character.minDmgScalingSpecial} />
              <DataItem label="Super" value={character.minDmgScalingSuper} />
            </div>
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>X-Factor Multipliers</StatSectionHeader>
            <DataRow label="Level 1" value={character.xf1} />
            <DataRow label="Level 2" value={character.xf2} />
            <DataRow label="Level 3" value={character.xf3} />
            <StatSectionFooter>Speed / Damage</StatSectionFooter>
          </StatSection>
        </div>
        <section className="model-display" />
        <div>
          <StatSection divider>
            <StatSectionHeader>Crossover Attack</StatSectionHeader>
            <DataRow label="Active" value={character.crossoverActive} />
            <DataRow label="Recovery" value={character.crossoverRecovery} />
            <DataRow label="Block Adv." value={character.crossoverBlockAdv} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Ground Dashes</StatSectionHeader>
            {character.id === "arthur" ? (
              <div className="no-air-dash-container">
                <Typography uppercase variant="subheading1">
                  {character.name} does not have a ground dash.
                </Typography>
              </div>
            ) : (
              <>
                {character.gdf && <DataRow label="Forward" value={character.gdf} />}
                {character.gdb && <DataRow label="Back" value={character.gdb} />}
                <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
              </>
            )}
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Air Dashes</StatSectionHeader>
            {character.airDashArchetype === "None" ? (
              <div className="no-air-dash-container">
                <Typography uppercase variant="subheading1">
                  {character.name} does not have an air dash.
                </Typography>
              </div>
            ) : (
              <>
                {character.adf && <DataRow label="Forward" value={character.adf} />}
                {character.addf && <DataRow label="Down Forward" value={character.addf} />}
                {character.add && <DataRow label="Down" value={character.add} />}
                {character.addb && <DataRow label="Down Back" value={character.addb} />}
                {character.adb && <DataRow label="Back" value={character.adb} />}
                {character.adub && <DataRow label="Up Back" value={character.adub} />}
                {character.adu && <DataRow label="Up" value={character.adu} />}
                {character.aduf && <DataRow label="Up Forward" value={character.aduf} />}
                <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>{" "}
              </>
            )}
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Jump Durations</StatSectionHeader>
            <div className="jump-duration-grid">
              {character.normalJumpDuration && <DataItem label="Normal" value={character.normalJumpDuration} />}
              {character.superJumpDuration && <DataItem label="Super" value={character.superJumpDuration} />}
              {character.doubleJumpDuration && <DataItem label="Double" value={character.doubleJumpDuration} />}
              {character.tripleJumpDuration && <DataItem label="Triple" value={character.tripleJumpDuration} />}
            </div>
          </StatSection>
        </div>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getCharacterIds();
  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
}

export const getStaticProps: GetStaticProps = (context) => {
  const { cid } = context.params as IParams;
  const character = getCharacterOverview(cid);
  return {
    props: {
      character,
    },
  };
};

export default Overview;
