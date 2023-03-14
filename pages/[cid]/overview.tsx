// packages
import React, { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ParsedUrlQuery } from "querystring";
// components
import CharacterInfoBox from "components/CharacterInfoBox";
import Drawer from "components/Drawer";
import Head from "components/Head";
import { List } from "components/Icon";
import Page from "components/Page";
import PageFooter, { PageFooterLinkType } from "components/PageFooter";
import PageHeader from "components/PageHeader";
import TableOfContents, { TableOfContentsItem } from "components/TableOfContents";
// utils
import { getCharacterIds, getCharacterOverview } from "lib/character";
import routes from "routes";
import { ICharacterOverview } from "types";

interface OverviewProps {
  character: ICharacterOverview;
  content: MDXRemoteSerializeResult;
  nextRoute: PageFooterLinkType;
  toc: Array<TableOfContentsItem>;
}

const Overview: NextPage<OverviewProps> = (props) => {
  const { character, content, nextRoute, toc } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Page>
      <Head cid={character.id} name={character.name} page="overview" />
      <TableOfContents label="Content" contents={toc} />
      <div className="mt-30 mb-16 w-full md:mt-34 lg:pl-8">
        <PageHeader heading="Overview" subheading={character.name} />
        <CharacterInfoBox character={character} />
        <MDXRemote {...content} />
        <PageFooter nextRoute={nextRoute} />
      </div>
      <button className="fab lg:hidden" onClick={() => setDrawerOpen(true)}>
        <List />
      </button>
      <Drawer heading="Overview" onClose={() => setDrawerOpen(false)} open={drawerOpen} position="right">
        <TableOfContents contents={toc} isDrawerToc label="Contents" onSelectItem={() => setDrawerOpen(false)} />
      </Drawer>
    </Page>
  );
};

interface IParams extends ParsedUrlQuery {
  cid: string;
}

function getHeadings(source: string) {
  // checks each line and verifies if it contains an h2 or h3 heading by the number of # at the start of row.
  const headingLines = source.split("\n").filter((line) => line.match(/^[#]{2,3}\s/));
  console.log(headingLines);
  const headings = headingLines.map((line) => {
    // check if there is remark-heading-id syntax (\{#...}\).
    const commentRegex = new RegExp(/\\\{.*\\\}/);
    const foundSubstring = line.match(commentRegex);
    let to = "#";
    if (foundSubstring) {
      // remove special syxtax from comment to create url
      to = "#" + foundSubstring[0].replace("\\{#", "").replace("\\}", "");
    }
    // remove entire comment from line for ui
    const label = line.replace(commentRegex, "").replace(/#/g, "").trim();
    // determine depth by getting the number of # at the start of the line and subtract 2 (h2 === depth: 0)
    const depth = line.split(" ")[0].length - 2;
    return { label, to, depth };
  });
  return headings;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { cid } = context.params as IParams;
  const { character, content } = getCharacterOverview(cid);
  const toc = getHeadings(content);
  const mdx = await serialize(content, { mdxOptions: { remarkPlugins: [require("remark-heading-id")] } });
  const nextRoute = { heading: "Moves", subheading: character.name, href: routes.moves(character.id) };
  return {
    props: {
      character,
      content: mdx,
      nextRoute,
      toc,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getCharacterIds();
  return {
    paths,
    fallback: false,
  };
};

export default Overview;
