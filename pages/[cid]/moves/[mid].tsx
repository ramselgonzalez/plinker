import fs from "fs";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { useRouter } from "next/router";
import { getPlaiceholder } from "plaiceholder";
import Chip from "components/Chip";
import Head from "components/Head";
import Page from "components/Page";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import TreeItem from "components/TreeItem";
import Typography from "components/Typography";
import { getMoveIds, getMove } from "lib/move";
import { IMoveDetail, IMovePreview, MoveTypeValues, RawCharacter } from "types";
import { getInputColor } from "helpers";
import routes from "routes";
import path from "path";

interface MoveProps {
  character: RawCharacter;
  move: IMoveDetail;
  moves: Array<IMovePreview>;
  minDmgScaling: number;
  xf1: number;
  xf2: number;
  xf3: number;
  blurDataURL: string;
}

function getFrameDataColor(adv: number | string) {
  if (typeof adv === "string") return;
  if (adv > 0) return "green";
  if (adv < 0) return "red";
}

const Move: NextPage<MoveProps> = (props) => {
  const { character, minDmgScaling, move, moves, blurDataURL } = props;
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
      <Head page="move" name={character.name} cid={cid} mid={move.id} move={move.name} />
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
        <div className="mt-34 mb-8 w-page-content pl-8">
          <header className="mb-2">
            <Typography color="aqua" className="uppercase" component="p" variant="h3">
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              {move.name}
            </Typography>
          </header>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <div className="flex h-auto w-1/2 overflow-hidden rounded-2xl border border-neutral-500 ">
                <Image
                  blurDataURL={blurDataURL}
                  placeholder={blurDataURL ? "blur" : undefined}
                  alt={`${character.name} performing ${move.name}`}
                  width={1920}
                  height={1080}
                  key={move.id}
                  priority
                  src={`/images/${cid}/moves/${move.id}.jpg`}
                />
              </div>
              <div className="flex w-1/2 flex-col">
                <div>
                  <Typography className="mb-2 uppercase" color="gray" variant="h4">
                    Input
                  </Typography>
                  <Chip color={getInputColor(move.input)}>
                    <Typography component="p" variant="h3">
                      {move.input}
                    </Typography>
                  </Chip>
                </div>
                <div className="mt-3 flex border-t border-neutral-700 pt-3">
                  <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                    <Typography color="gray" className="uppercase" variant="h4">
                      Class
                    </Typography>
                    <Typography component="p" className="uppercase" variant="h3">
                      {move.type}
                    </Typography>
                  </div>
                  <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                    <Typography color="gray" className="uppercase" variant="h4">
                      Block
                    </Typography>
                    <Typography component="p" className="uppercase" variant="h3">
                      {move.block}
                    </Typography>
                  </div>
                  <div className="flex-auto px-2 text-center">
                    <Typography color="gray" className="uppercase" variant="h4">
                      Hit Type
                    </Typography>
                    <Typography component="p" className="uppercase" variant="h3">
                      {move.hit}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="my-3 flex border-t border-neutral-700 pt-2">
                    <Typography>{move.description}</Typography>
                  </div>
                  {move.attributes.length > 0 && (
                    <div>
                      <Typography color="gray" className="uppercase" variant="h4">
                        Attributes
                      </Typography>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {move.attributes.map((a) => (
                          <Chip key={a}>
                            <Typography className="uppercase" variant="h4" component="span">
                              {a}
                            </Typography>
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex rounded-2xl bg-neutral-800 p-3">
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Start Up
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {move.startUp}
                </Typography>
              </div>
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Active
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {move.active}
                </Typography>
              </div>
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Recovery
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {move.recovery}
                </Typography>
              </div>
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Block Adv.
                </Typography>
                <Typography color={getFrameDataColor(move.advBlock)} component="p" className="uppercase" variant="h3">
                  {move.advBlock}
                </Typography>
              </div>
              <div className="flex-auto px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Hit Adv.
                </Typography>
                <Typography color={getFrameDataColor(move.advHit)} component="p" className="uppercase" variant="h3">
                  {move.advHit}
                </Typography>
              </div>
            </div>
            <div className="flex rounded-2xl bg-neutral-800 p-3">
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Damage
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {move.dmg}
                </Typography>
              </div>
              {move.dmgMax && (
                <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                  <Typography color="gray" className="uppercase" variant="h4">
                    Max Damage
                  </Typography>
                  <Typography component="p" className="uppercase" variant="h3">
                    {move.dmgMax}
                  </Typography>
                </div>
              )}
              {!move.isLevelThree && (
                <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                  <Typography color="gray" className="uppercase" variant="h4">
                    Max Scaled Damage
                  </Typography>
                  <Typography component="p" className="uppercase" variant="h3">
                    {move.dmg * minDmgScaling}
                  </Typography>
                </div>
              )}
              <div className="flex-auto px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Meter Gain
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {move.meterGain}
                </Typography>
              </div>
            </div>
            <div className="flex gap-x-8">
              <div className="w-3/5">
                <Typography color="gray" className="uppercase" variant="h4">
                  Usage and Extra Info
                </Typography>
                <ul className="list-inside list-disc">
                  {move.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
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
  const data = getMove(cid, mid);
  const imgUrl = `/images/${cid}/moves/${mid}.jpg`;
  const fullPath = path.join(process.cwd(), "public", imgUrl);
  let base64 = "";

  if (fs.existsSync(fullPath)) {
    const res = await getPlaiceholder(imgUrl, { size: 32 });
    base64 = res.base64;
  }

  return {
    props: {
      ...data,
      blurDataURL: base64,
    },
  };
};

export default Move;
