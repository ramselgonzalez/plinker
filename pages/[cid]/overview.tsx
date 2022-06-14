import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { getCharacterIds, getCharacterOverview } from "lib/characters";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import Page from "components/Page";
import Row from "components/Row";
import StatSectionHeader from "components/StatSectionHeader";
import StatSection from "components/StatSection";
import StatSectionFooter from "components/StatSectionFooter";
import Typography from "components/Typography";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import { ICharacterOverview } from "types";
import TreeItem from "components/TreeItem";

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
  const { character } = props;
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
      <Page>
        <Tree>
          <TreeSection label="Content">
            <TreeItem to="#overview">Overview</TreeItem>
            <TreeItem to="#pros-and-cons">Pros and Cons</TreeItem>
            <TreeItem to="#strategy">Strategy</TreeItem>
          </TreeSection>
        </Tree>
        <div className="mt-34 mb-16 grid w-page-content grid-cols-[1fr_400px] gap-x-8 pl-8">
          <div>
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {character.name}
            </Typography>
          </div>
          <div className="rounded-2xl bg-neutral-800 p-4">
            <div className="relative mb-4 h-96 rounded-2xl border border-neutral-500">
              <Image
                className="rounded-2xl"
                alt={character.name}
                objectFit="cover"
                layout="fill"
                src={`/images/thumbnails_${character.id}.webp`}
              />
            </div>
            <StatSection divider>
              <StatSectionHeader>Basic Stats</StatSectionHeader>
              <Row label="Health" value={character.health} />
              <Row label="Magic Series" value={character.chainComboArchetype} />
              <Row label="Air Dash" value={character.airDashArchetype} />
              <Row label="Archetype" value={character.archetype} />
              <Row label="Recommended Position" value={character.recommendedPosition} />
            </StatSection>
            <StatSection divider>
              <StatSectionHeader>Min. Damage Scaling</StatSectionHeader>
              <Row label="Normal" value={character.minDmgScalingNormal} />
              <Row label="Special" value={character.minDmgScalingSpecial} />
              <Row label="Super" value={character.minDmgScalingSuper} />
            </StatSection>
            <StatSection divider>
              <StatSectionHeader>X-Factor Multipliers</StatSectionHeader>
              <Row label="Level 1" value={character.xf1} />
              <Row label="Level 2" value={character.xf2} />
              <Row label="Level 3" value={character.xf3} />
              <StatSectionFooter>Speed / Damage</StatSectionFooter>
            </StatSection>
            <StatSection divider>
              <StatSectionHeader>Crossover Attack</StatSectionHeader>
              <Row label="Active" value={character.crossoverActive} />
              <Row label="Recovery" value={character.crossoverRecovery} />
              <Row label="Block Adv." value={character.crossoverBlockAdv} />
            </StatSection>
            <StatSection divider>
              <StatSectionHeader>Ground Dashes</StatSectionHeader>
              {character.id === "arthur" ? (
                <div className="flex h-20 items-center justify-center text-center">
                  <Typography>{character.name} does not have a ground dash.</Typography>
                </div>
              ) : (
                <>
                  {character.gdf && <Row label="Forward" value={character.gdf} />}
                  {character.gdb && <Row label="Back" value={character.gdb} />}
                  <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
                </>
              )}
            </StatSection>
            <StatSection divider>
              <StatSectionHeader>Air Dashes</StatSectionHeader>
              {character.airDashArchetype === "None" ? (
                <div className="flex h-20 items-center justify-center text-center">
                  <Typography>{character.name} does not have an air dash.</Typography>
                </div>
              ) : (
                <>
                  {character.adf && <Row label="Forward" value={character.adf} />}
                  {character.addf && <Row label="Down Forward" value={character.addf} />}
                  {character.add && <Row label="Down" value={character.add} />}
                  {character.addb && <Row label="Down Back" value={character.addb} />}
                  {character.adb && <Row label="Back" value={character.adb} />}
                  {character.adub && <Row label="Up Back" value={character.adub} />}
                  {character.adu && <Row label="Up" value={character.adu} />}
                  {character.aduf && <Row label="Up Forward" value={character.aduf} />}
                  <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
                </>
              )}
            </StatSection>
            <StatSection divider>
              <StatSectionHeader>Jump Durations</StatSectionHeader>
              {character.normalJumpDuration && <Row label="Normal" value={character.normalJumpDuration} />}
              {character.superJumpDuration && <Row label="Super" value={character.superJumpDuration} />}
              {character.doubleJumpDuration && <Row label="Double" value={character.doubleJumpDuration} />}
              {character.tripleJumpDuration && <Row label="Triple" value={character.tripleJumpDuration} />}
            </StatSection>
          </div>
        </div>
      </Page>
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
