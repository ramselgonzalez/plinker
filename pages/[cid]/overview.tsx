import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getCharacterIds, getCharacterOverview } from "lib/characters";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Container from "components/Container";
import DataItem from "components/DataItem";
import DataRow from "components/DataRow";
import StatSectionHeader from "components/StatSectionHeader";
import StatSection from "components/StatSection";
import StatSectionFooter from "components/StatSectionFooter";
import Typography from "components/Typography";
import { ICharacterOverview } from "types";

interface OverviewProps {
  character: ICharacterOverview;
}

const Overview: NextPage<OverviewProps> = (props) => {
  const { character } = props;
  return (
    <>
      <Head>
        <title>{character.name} / Overview / Plinker</title>
        <meta property="og:title" content={`${character.name} | Plinker`} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta
          property="og:description"
          content={`Learn more about ${character.name}'s stats, playstyle, and team compositions in Ultimate Marvel vs. Capcom 3.`}
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={`A portrait of ${character.name}`} />
        <link type="application/json+oembed" href={`${process.env.NEXT_PUBLIC_HOST}/oembed.json`} />
      </Head>
      <Container className="stats-container">
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
            <DataRow label="Archetype" value="Rushdown" />
            <DataRow label="Recommended Position" value={character.recommendedPosition} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Min. Damage Scaling</StatSectionHeader>
            <div className="damage-scaling-grid">
              <DataItem label="Light" value={character.minDmgScalingLight} />
              <DataItem label="Medium" value={character.minDmgScalingMedium} />
              <DataItem label="Heavy" value={character.minDmgScalingHeavy} />
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
            <StatSectionHeader>Ground Dashes</StatSectionHeader>
            {character.gdf && <DataRow label="Forward" value={character.gdf} />}
            {character.gdb && <DataRow label="Back" value={character.gdb} />}
            <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Air Dashes</StatSectionHeader>
            {character.adf && <DataRow label="Forward" value={character.adf} />}
            {character.addf && <DataRow label="Down Forward" value={character.addf} />}
            {character.add && <DataRow label="Down" value={character.add} />}
            {character.addb && <DataRow label="Down Back" value={character.addb} />}
            {character.adb && <DataRow label="Back" value={character.adb} />}
            {character.adub && <DataRow label="Up Back" value={character.adub} />}
            {character.adu && <DataRow label="Up" value={character.adu} />}
            {character.aduf && <DataRow label="Up Forward" value={character.aduf} />}
            <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
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
