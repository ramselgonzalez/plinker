import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import Chip from "components/Chip";
import Head from "components/Head";
import Page from "components/Page";
import Typography from "components/Typography";
import Tree from "components/Tree";
import TreeSection from "components/TreeSection";
import TreeItem from "components/TreeItem";
import { MarkdownComponents } from "helpers/markdown";
import { getAssistIds, getAssist } from "lib/assist";
import { IAssistDetail, IAssistPreview } from "types";
import routes from "routes";
import { getAssistTypeColor } from "helpers";

interface AssistProps {
  cname: string;
  content: MDXRemoteSerializeResult;
  assist: IAssistDetail;
  assists: Array<IAssistPreview>;
}

const Assist: NextPage<AssistProps> = (props) => {
  const { assist, assists, cname, content } = props;
  const router = useRouter();
  const cid = router.query.cid as string;
  return (
    <>
      <Head page="assist" name={cname} cid={cid} move={assist.name} mid={assist.id} />
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
                  <Chip className={getAssistTypeColor(assist.type)}>
                    <Typography component="p" className="uppercase" variant="h3">
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
                  <Typography>{assist.description}</Typography>
                </div>
                {assist.attributes.length > 0 && (
                  <div>
                    <Typography color="gray" className="uppercase" variant="h4">
                      Attributes
                    </Typography>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {assist.attributes.map((a) => (
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
            <div className="flex rounded-2xl bg-neutral-800 p-4">
              <div className="flex-1 border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Start Up
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.startUp}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Active
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.active}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Recovery
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.recovery}
                </Typography>
              </div>
              <div className="flex-1 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Alt. Recovery
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.recoveryAlt}
                </Typography>
              </div>
            </div>
            <div className="flex rounded-2xl bg-neutral-800 p-4">
              <div className="flex-1 border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Hits
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.hits}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Damage
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.dmg}
                </Typography>
              </div>
              <div className="flex-1 px-2 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Meter Gain
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {assist.meterGain}
                </Typography>
              </div>
            </div>
            <div className="w-4/5">
              <MDXRemote {...content} components={MarkdownComponents} />
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

export const getStaticProps: GetStaticProps<AssistProps> = async (context) => {
  const { cid, aid } = context.params as IParams;
  const { content, ...rest } = getAssist(cid, aid);
  const mdx = await serialize(content);
  return {
    props: { ...rest, content: mdx },
  };
};

export default Assist;
