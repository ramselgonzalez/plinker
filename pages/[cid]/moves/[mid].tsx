import fs from "fs";
import path from "path";
import { useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getPlaiceholder } from "plaiceholder";
import Chip from "components/Chip";
import DataItem from "components/DataItem";
import Head from "components/Head";
import Page from "components/Page";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import TreeItem from "components/TreeItem";
import Typography from "components/Typography";
import { getMoveIds, getMove } from "lib/move";
import { IMoveDetail, IMovePreview, MoveTypeValues, RawCharacter } from "types";
import { MarkdownComponents } from "helpers/markdown";
import { getInputColor } from "helpers";
import routes from "routes";
import Drawer from "components/Drawer";
import { ChevronRight, List } from "components/Icon";

interface MoveProps {
  blurDataURL: string;
  content: MDXRemoteSerializeResult;
  character: RawCharacter;
  move: IMoveDetail;
  moves: Array<IMovePreview>;
}

function getFrameDataColor(adv: number | string) {
  if (typeof adv === "string") return;
  if (adv > 0) return "green";
  if (adv < 0) return "red";
}

const Move: NextPage<MoveProps> = (props) => {
  const { content, character, move, moves, blurDataURL } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { query } = useRouter();
  const cid = query.cid as string;
  const sections = [];
  for (const type of MoveTypeValues) {
    const items = moves.filter((m) => m.type === type);
    if (items.length > 0) {
      sections.push({ items, label: type + "s", id: type.replace(" ", "-").toLowerCase() + "s" });
    }
  }
  return (
    <>
      <Head cid={cid} mid={move.id} move={move.name} name={character.name} page="move" />
      <Page>
        <Tree>
          {sections.map((s) => (
            <TreeSection key={s.label} label={s.label}>
              {s.items.map((n) => (
                <TreeItem key={n.id} to={routes.move(cid, n.id)}>
                  {n.name}
                </TreeItem>
              ))}
            </TreeSection>
          ))}
        </Tree>
        <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
          <header className="mb-2">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              {move.name}
            </Typography>
          </header>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-x-4 md:flex-row">
              <div className="relative mb-2 flex h-auto overflow-hidden rounded-2xl border border-neutral-500 md:mb-0 md:w-1/2">
                <Image
                  alt={move.imgAlt}
                  blurDataURL={blurDataURL}
                  height={480}
                  key={move.id}
                  objectFit="cover"
                  placeholder={blurDataURL ? "blur" : undefined}
                  priority
                  src={move.imgUrl}
                  width={853}
                />
              </div>
              <div className="flex flex-col md:w-1/2">
                <div>
                  <Typography className="mb-2 uppercase" color="gray" variant="h4">
                    Input
                  </Typography>
                  <Chip className="h3" color={getInputColor(move.input)}>
                    {move.input}
                  </Chip>
                </div>
                <div className="mt-3 flex border-t border-neutral-700 pt-3">
                  <DataItem className="border-r" label="Class" value={move.type} />
                  <DataItem className="border-r" label="Block" value={move.block} />
                  <DataItem label="Hit Type" value={move.hit} />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="my-3 flex border-t border-neutral-700 pt-2">
                    <Typography>{move.description}</Typography>
                  </div>
                  {move.attributes.length > 0 && (
                    <div>
                      <Typography className="uppercase" color="gray" variant="h4">
                        Attributes
                      </Typography>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {move.attributes.map((a) => (
                          <Chip className="h4 uppercase" key={a}>
                            {a}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-4 rounded-2xl bg-neutral-800 p-3 shadow-md shadow-black/30">
              <DataItem label="Start Up" value={move.startUp} />
              <DataItem label="Active" value={move.active} />
              <DataItem label="Recovery" value={move.recovery} />
              <DataItem color={getFrameDataColor(move.advBlock)} label="Block Adv." value={move.advBlock} />
              <DataItem color={getFrameDataColor(move.advHit)} label="Hit Adv." value={move.advHit} />
            </div>
            <div className="flex flex-wrap gap-y-4 rounded-2xl bg-neutral-800 p-3 shadow-md shadow-black/30">
              <DataItem label="Hits" value={move.hits} />
              <DataItem label="Damage" value={move.dmg} />
              <DataItem label="Meter Gain" value={move.meterGain} />
            </div>
            <div className="-mt-4 w-4/5">
              <MDXRemote {...content} components={MarkdownComponents} />
            </div>
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
              Move List
            </Typography>
          </div>
          <ul className="-mt-2 px-5 py-4">
            {sections.map((s) => (
              <TreeSection key={s.label} label={s.label}>
                {s.items.map((n) => (
                  <TreeItem key={n.id} onClick={() => setDrawerOpen(false)} to={routes.move(cid, n.id)}>
                    {n.name}
                  </TreeItem>
                ))}
              </TreeSection>
            ))}
          </ul>
        </Drawer>
      </Page>
    </>
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

export const getStaticProps: GetStaticProps<MoveProps> = async (context) => {
  const { cid, mid } = context.params as IParams;
  const { content: mdx, move, ...rest } = getMove(cid, mid);
  const content = await serialize(mdx);
  const fullPath = path.join(process.cwd(), "public", move.imgUrl);
  let blurDataURL = "";
  if (fs.existsSync(fullPath)) {
    const { base64 } = await getPlaiceholder(move.imgUrl, { size: 32 });
    blurDataURL = base64;
  }

  return {
    props: {
      ...rest,
      content,
      move,
      blurDataURL,
    },
  };
};

export default Move;
