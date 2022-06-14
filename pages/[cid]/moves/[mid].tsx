import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Chip from "components/Chip";
import Page from "components/Page";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import TreeItem from "components/TreeItem";
import Typography from "components/Typography";
import { getMoveIds, getMove } from "lib/characters";
import { IMoveDetail, IMovePreview, RawMove, MoveTypeValues } from "types";
import { getInputColor } from "helpers";
import routes from "routes";

function getPageTitle(name: string, move: string) {
  return `${name} / ${move} / Plinker`;
}

function getOpenGraphTitle(name: string, move: string) {
  return `${name} | ${move}`;
}

function getOpenGraphImageAlt(name: string, move: string) {
  return `${name} performing ${move}`;
}

function getOpenGraphDescription(name: string, move: string) {
  return `Frame data and details for ${name}'s ${move}.`;
}

function getOpenGraphImage(cid: string, mid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/${cid}/moves/${mid}.jpg`;
}

interface MoveProps {
  cname: string;
  move: IMoveDetail;
  moves: Array<IMovePreview>;
  previousMove: RawMove;
  nextMove: RawMove;
  moveIndex: number;
  minDmgScaling: number;
  totalMoves: number;
  xf1: number;
  xf2: number;
  xf3: number;
}

function getFrameDataColor(adv: number | string) {
  if (typeof adv === "string") return;
  if (adv > 0) return "green";
  if (adv < 0) return "red";
}

const Move: NextPage<MoveProps> = (props) => {
  const { cname, minDmgScaling, move, moves, nextMove, previousMove, moveIndex, totalMoves, xf1, xf2, xf3 } = props;
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
      <Head>
        <title>{getPageTitle(cname, move.name)}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname, move.name)} />
        <meta property="og:description" content={getOpenGraphDescription(cname, move.name)} />
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:alt" content={getOpenGraphImageAlt(cname, move.name)} />
        <meta property="og:image" content={getOpenGraphImage(cid, move.id)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
              {cname}
            </Typography>
            <Typography className="uppercase" variant="h1">
              {move.name}
            </Typography>
          </header>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <div className="flex h-auto w-1/2 overflow-hidden rounded-2xl border border-neutral-500">
                <Image
                  alt={`${cname} performing ${move.name}`}
                  width={1920}
                  height={1080}
                  priority
                  placeholder="empty"
                  loading="eager"
                  src={`/images/${cid}/moves/${move.id}.jpg`}
                />
              </div>
              <div className="w-1/2">
                <div>
                  <Typography className="mb-2 uppercase" color="gray" variant="h4">
                    Input
                  </Typography>
                  <Chip className="inline-block" color={getInputColor(move.input)}>
                    <Typography
                      color={getInputColor(move.input) === "yellow" ? "black" : "white"}
                      component="p"
                      className="mx-2"
                      variant="h3"
                    >
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
                <div className="mt-3 flex border-t border-neutral-700 pt-2">
                  <Typography>
                    Nostrud aliqua adipisicing est Lorem sunt laboris laboris anim id ut aute excepteur et. Culpa
                    consectetur non eu et mollit et aliqua ut Lorem. Nostrud anim non tempor fugiat occaecat eiusmod
                    cupidatat aliquip cillum excepteur. In labore ullamco ad culpa qui. Fugiat non consectetur excepteur
                    minim do voluptate cillum esse est.
                  </Typography>
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
              <div className="w-2/5">
                <Typography color="gray" className="uppercase" variant="h4">
                  Attributes
                </Typography>
                {move.attributes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {move.attributes.map((a) => (
                      <Chip key={a}>
                        <Typography className="uppercase" variant="h4" component="span">
                          {a}
                        </Typography>
                      </Chip>
                    ))}
                  </div>
                )}
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

export const getStaticProps: GetStaticProps<MoveProps> = (context) => {
  const { cid, mid } = context.params as IParams;
  const data = getMove(cid, mid);
  return {
    props: { ...data },
  };
};

export default Move;
