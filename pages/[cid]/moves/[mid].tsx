// packages
import fs from "fs";
import path from "path";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getPlaiceholder } from "plaiceholder";
// components
import DataItem from "components/DataItem";
import Drawer from "components/Drawer";
import Head from "components/Head";
import { List } from "components/Icon";
import MarkdownComponents from "components/Markdown";
import MoveOverview from "components/MoveOverview";
import Page from "components/Page";
import PageHeader from "components/PageHeader";
import TableOfContents, { TableOfContentsItem } from "components/TableOfContents";
// utils
import { getFrameDataColor } from "helpers/move";
import { getMoveIds, getMove } from "lib/move";
import routes from "routes";
import { IMoveDetail, IMovePreview, MoveTypeValues, RawCharacter } from "types";

interface MoveProps {
  blurDataURL: string;
  content: MDXRemoteSerializeResult;
  character: RawCharacter;
  move: IMoveDetail;
  toc: Array<TableOfContentsItem>;
}

const Move: NextPage<MoveProps> = (props) => {
  const { content, character, move, blurDataURL, toc } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Page>
      <Head cid={character.id} mid={move.id} move={move.name} name={character.name} page="move" />
      <TableOfContents contents={toc} label="Contents" onSelectItem={() => setDrawerOpen(false)} />
      <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
        <PageHeader heading={move.name} subheading={character.name} />
        <div className="flex flex-col">
          <MoveOverview move={move} blurDataURL={blurDataURL} />
          <div className="paper my-2 flex flex-wrap gap-y-4 p-4">
            <DataItem className="flex-auto" label="Start Up" value={move.startUp} />
            <DataItem className="flex-auto" label="Active" value={move.active} />
            <DataItem className="flex-auto" label="Recovery" value={move.recovery} />
            <DataItem
              className="flex-auto"
              color={getFrameDataColor(move.advBlock)}
              label="Block Adv."
              value={move.advBlock}
            />
            <DataItem
              className="flex-auto"
              color={getFrameDataColor(move.advHit)}
              label="Hit Adv."
              value={move.advHit}
            />
          </div>
          <div className="paper my-2 flex flex-wrap gap-y-4 p-4">
            <DataItem className="flex-auto" label="Hits" value={move.hits} />
            <DataItem className="flex-auto" label="Damage" value={move.dmg} />
            <DataItem className="flex-auto" label="Meter Gain" value={move.meterGain} />
          </div>
          <MDXRemote {...content} components={MarkdownComponents} />
        </div>
      </div>
      <button className="fab lg:hidden" onClick={() => setDrawerOpen(true)}>
        <List />
      </button>
      <Drawer heading="Move List" onClose={() => setDrawerOpen(false)} open={drawerOpen} position="right">
        <TableOfContents contents={toc} label="Contents" isDrawerToc onSelectItem={() => setDrawerOpen(false)} />
      </Drawer>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getMoveIds();
  return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
  mid: string;
}

function getMoveListTableOfContents(cid: string, moves: Array<IMovePreview>): Array<TableOfContentsItem> {
  const contents = [];
  for (const type of MoveTypeValues) {
    const items = moves.filter((m) => m.type === type);
    if (items.length > 0) {
      contents.push({ label: `${type}s`, depth: 0 });
      for (const item of items) {
        contents.push({ label: item.name, to: routes.move(cid, item.id), depth: 1 });
      }
    }
  }
  return contents;
}

async function getBlurDataUrl(imgUrl: string) {
  const absPath = path.join(process.cwd(), "public", imgUrl);
  if (!fs.existsSync(absPath)) {
    return "";
  }
  const { base64 } = await getPlaiceholder(imgUrl, { size: 32 });
  return base64;
}

export const getStaticProps: GetStaticProps<MoveProps> = async (context) => {
  const { cid, mid } = context.params as IParams;
  const { content: mdx, move, ...rest } = getMove(cid, mid);
  const content = await serialize(mdx);

  const toc = getMoveListTableOfContents(cid, rest.moves);
  const blurDataURL = await getBlurDataUrl(move.imgUrl);

  return {
    props: {
      ...rest,
      content,
      move,
      blurDataURL,
      toc,
    },
  };
};

export default Move;
