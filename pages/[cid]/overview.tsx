import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { getCharacterIds, getCharacterOverview } from "lib/character";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";
import Head from "components/Head";
import Page from "components/Page";
import Typography from "components/Typography";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import { MarkdownComponents } from "helpers/markdown";
import { ICharacterOverview } from "types";
import TreeItem from "components/TreeItem";
import * as Tables from "components/Table";
import { ChevronRight, List } from "components/Icon";
import Drawer from "components/Drawer";

interface OverviewProps {
  character: ICharacterOverview;
  content: MDXRemoteSerializeResult;
  headings: { label: string; id: string }[];
}

const Overview: NextPage<OverviewProps> = (props) => {
  const { character, content, headings } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Head cid={character.id} name={character.name} page="overview" />
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
        <div className="mt-30 mb-16 w-full md:mt-34 lg:pl-8">
          <header className="mb-2 md:mb-0">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Overview
            </Typography>
          </header>
          <div>
            <div className="md:float-right md:bg-neutral-900 md:pl-4 md:pb-2">
              <div className="paper mt-4 h-max flex-shrink-0 p-4 md:-mt-2 md:w-[375px]">
                <div className="relative mb-4 h-96 overflow-hidden rounded-2xl border border-neutral-500">
                  <Image alt={character.imgAlt} layout="fill" objectFit="cover" src={character.imgUrl} />
                </div>
                <Tables.BasicStats character={character} />
                <Tables.DamageScaling character={character} />
                <Tables.XfactorMultipliers character={character} />
                <Tables.GroundDashes character={character} />
                {character.airDashArchetype !== "None" && <Tables.AirDashes character={character} />}
                <Tables.JumpDurations character={character} />
                <Tables.CrossoverAttack character={character} />
              </div>
            </div>
            <MDXRemote {...content} components={MarkdownComponents} />
          </div>
        </div>
        <button className="fab lg:hidden" onClick={() => setDrawerOpen(true)}>
          <List />
        </button>
        <Drawer onClose={() => setDrawerOpen(false)} open={drawerOpen} position="right">
          <div className="flex h-14 items-center gap-4 border-b border-neutral-600 px-4">
            <button onClick={() => setDrawerOpen(false)}>
              <ChevronRight />
            </button>
            <Typography className="uppercase" variant="h4">
              Overview
            </Typography>
          </div>
          <ul className="-mt-2 px-5 py-4">
            <TreeSection label="Table of Contents">
              {headings.map((h) => (
                <TreeItem onClick={() => setDrawerOpen(false)} key={h.id} to={h.id}>
                  {h.label}
                </TreeItem>
              ))}
            </TreeSection>
          </ul>
        </Drawer>
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

export default Overview;
