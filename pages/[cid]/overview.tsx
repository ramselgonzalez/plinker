import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
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

function getIdFromChildren(children: React.ReactNode) {
  if (typeof children === "string") {
    return children.toLowerCase().replace(/ /g, "-");
  }

  return undefined;
}

interface OverviewProps {
  character: ICharacterOverview;
  content: MDXRemoteSerializeResult;
  headings: { label: string; id: string }[];
}

const Overview: NextPage<OverviewProps> = (props) => {
  const { character, content, headings } = props;
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
            {headings.map((h) => (
              <TreeItem key={h.id} to={h.id}>
                {h.label}
              </TreeItem>
            ))}
          </TreeSection>
        </Tree>
        <div className="mt-34 mb-16 grid w-full grid-cols-[1fr_375px] gap-x-8 pl-8">
          <div>
            <header className="mb-2">
              <Typography className="uppercase" color="aqua" component="p" variant="h3">
                {character.name}
              </Typography>
              <Typography className="uppercase" variant="h1">
                Overview
              </Typography>
            </header>
            <MDXRemote
              {...content}
              components={{
                Typography,
                a: ({ children, href = "#" }) => (
                  <a href={href} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline">
                    {children}
                  </a>
                ),
                p: ({ children }) => <Typography className="mb-4">{children}</Typography>,
                h2: ({ children }) => (
                  <Typography
                    id={getIdFromChildren(children)}
                    className="mt-8 mb-2 scroll-mt-28 border-b border-neutral-500 pb-2 uppercase first-of-type:mt-4"
                    variant="h2"
                  >
                    {children}
                  </Typography>
                ),
                h3: ({ children }) => (
                  <Typography className="uppercase" variant="h3">
                    {children}
                  </Typography>
                ),
                h4: ({ children }) => (
                  <Typography className="mb-4 uppercase" variant="h4">
                    {children}
                  </Typography>
                ),
                ul: ({ children }) => <ul className="list-inside list-disc">{children}</ul>,
              }}
            />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { cid } = context.params as IParams;
  const { character, content } = getCharacterOverview(cid);
  const headings = getHeadings(content);
  const mdx = await serialize(content);

  return {
    props: {
      character,
      content: mdx,
      headings,
    },
  };
};

function getHeadings(source: string) {
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^## *\s/);
  });

  return headingLines.map((raw) => {
    const heading = raw.replace(/^##*\s/, "").replace("\r", "");
    const id = "#" + heading.toLowerCase().replace(/ /g, "-");
    return { label: heading, id };
  });
}

export default Overview;
