import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Chip from "components/Chip";
import Page from "components/Page";
import Row from "components/Row";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import { getAssistIds, getAssist } from "lib/characters";
import { IAssistDetail, IAssistPreview, IMoveLink } from "types";
import { getMeterGain } from "helpers";
import routes from "routes";
import TreeItem from "components/TreeItem";

function getPageTitle(name: string, assist: string) {
  return `${name} / ${assist} / Plinker`;
}

function getOpenGraphTitle(name: string, assist: string) {
  return `${name} | ${assist}`;
}

function getOpenGraphImageAlt(name: string, assist: string) {
  return `${name} performing ${assist}`;
}

function getOpenGraphDescription(name: string, assist: string) {
  return `Frame data and details for ${name}'s ${assist} assist.`;
}

function getOpenGraphImage(cid: string, mid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/${cid}/moves/${mid}.jpg`;
}

interface AssistProps {
  cname: string;
  assist: IAssistDetail;
  assists: Array<IAssistPreview>;
  previousAssist: IMoveLink;
  nextAssist: IMoveLink;
  assistIndex: number;
  minDmgScaling: number;
  xf1: number;
  xf2: number;
  xf3: number;
}

const Assist: NextPage<AssistProps> = (props) => {
  const { assist, assists, cname, minDmgScaling, xf1, xf2, xf3 } = props;
  const router = useRouter();
  const cid = router.query.cid as string;
  return (
    <>
      <Head>
        <title>{getPageTitle(cname, assist.name)}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname, assist.name)} />
        <meta property="og:description" content={getOpenGraphDescription(cname, assist.name)} />
        <meta property="og:image" content={getOpenGraphImage(cid, assist.id)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={getOpenGraphImageAlt(cname, assist.name)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Page>
        <Tree>
          <TreeSection label="Assists">
            {assists.map((a) => (
              <TreeItem key={a.id} to={routes.assist(cid, a.id)}>
                {a.name}
              </TreeItem>
            ))}
          </TreeSection>
        </Tree>
        <div className="mt-34 mb-8 w-page-content pl-8">
          <header className="mb-2">
            <Typography color="aqua" className="uppercase" component="p" variant="h3">
              {cname}
            </Typography>
            <Typography className="uppercase" variant="h1">
              {assist.name}
            </Typography>
          </header>
          <div className="flex flex-col gap-y-4">
            <div className="flex gap-x-4">
              <div className="flex h-auto w-1/2 overflow-hidden rounded-2xl border border-neutral-500">
                <Image
                  alt={`${cname} being called in as an assist performing ${assist.name}`}
                  width={1920}
                  height={1080}
                  src={`/images/${cid}/assists/${assist.id}.jpg`}
                  placeholder="empty"
                  loading="eager"
                />
              </div>
              <div className="w-1/2">
                <div>
                  <Typography className="mb-2 uppercase" color="gray" variant="h4">
                    Assist Type
                  </Typography>
                  <Chip className="inline-block">
                    <Typography component="p" className="mx-2 uppercase" variant="h3">
                      {assist.type}
                    </Typography>
                  </Chip>
                </div>
                <div className="mt-3 flex border-t border-neutral-700 pt-3">
                  <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                    <Typography color="gray" className="uppercase" variant="h4">
                      Team Hyper Combo
                    </Typography>
                    <Typography component="p" className="uppercase" variant="h3">
                      {assist.thc}
                    </Typography>
                  </div>
                  <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                    <Typography color="gray" className="uppercase" variant="h4">
                      Block
                    </Typography>
                    <Typography component="p" className="uppercase" variant="h3">
                      {assist.block}
                    </Typography>
                  </div>
                  <div className="flex-auto px-2 text-center">
                    <Typography color="gray" className="uppercase" variant="h4">
                      Hit Type
                    </Typography>
                    <Typography component="p" className="uppercase" variant="h3">
                      {assist.hit}
                    </Typography>
                  </div>
                </div>
                <div className="mt-3 flex border-t border-neutral-700 pt-2">
                  <Typography>
                    Ea sint consequat eu adipisicing voluptate proident mollit labore laboris reprehenderit. Enim
                    occaecat est adipisicing qui duis proident sunt aute. Proident eiusmod ullamco non esse duis enim
                    nisi esse. Nulla duis exercitation nulla commodo ex dolore aliqua adipisicing irure.
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
                  {assist.startUp}
                </Typography>
              </div>
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Active
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.active}
                </Typography>
              </div>
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Recovery
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.recovery}
                </Typography>
              </div>
              <div className="flex-auto px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Alt. Recovery
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.recoveryAlt}
                </Typography>
              </div>
            </div>
            <div className="flex rounded-2xl bg-neutral-800 p-3">
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Damage
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.dmg}
                </Typography>
              </div>
              <div className="flex-auto border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Max Scaled Damage
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.dmg * minDmgScaling}
                </Typography>
              </div>
              <div className="flex-auto px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Meter Gain
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.meterGain}
                </Typography>
              </div>
            </div>
            <div className="flex gap-x-8">
              <div className="w-3/5">
                <Typography color="gray" className="uppercase" variant="h4">
                  Usage and Extra Info
                </Typography>
                <ul className="list-inside list-disc">
                  {assist.notes.map((n, i) => (
                    <li key={i}>{n}</li>
                  ))}
                </ul>
              </div>
              <div className="w-2/5">
                <Typography color="gray" className="uppercase" variant="h4">
                  Attributes
                </Typography>
                {assist.attributes.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {assist.attributes.map((a) => (
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
  const paths = getAssistIds();
  return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
  aid: string;
}

export const getStaticProps: GetStaticProps<AssistProps> = (context) => {
  const { cid, aid } = context.params as IParams;
  const data = getAssist(cid, aid);

  return {
    props: { ...data },
  };
};

export default Assist;
