import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Image from "next/image";
import Chip from "components/Chip";
import DataItem from "components/DataItem";
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
      <Head cid={cid} mid={assist.id} move={assist.name} name={cname} page="assist" />
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
        <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
          <header className="mb-2">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {cname}
            </Typography>
            <Typography className="uppercase" variant="h1">
              {assist.name}
            </Typography>
          </header>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-x-4 md:flex-row">
              <div className="mb-2 flex h-auto overflow-hidden rounded-2xl border border-neutral-500 md:mb-0 md:w-1/2">
                <Image
                  alt={`${cname} being called in as an assist performing ${assist.name}`}
                  height={1080}
                  loading="eager"
                  placeholder="empty"
                  src={`/images/${cid}/assists/${assist.id}.jpg`}
                  width={1920}
                />
              </div>
              <div className="md:w-1/2">
                <div>
                  <Typography className="mb-2 uppercase" color="gray" variant="h4">
                    Assist Type
                  </Typography>
                  <Chip className={getAssistTypeColor(assist.type)}>
                    <Typography className="uppercase" component="p" variant="h3">
                      {assist.type}
                    </Typography>
                  </Chip>
                </div>
                <div className="mt-3 flex border-t border-neutral-700 pt-3">
                  <DataItem className="border-r border-neutral-700" label="Team Hyper Combo" value={assist.thc} />
                  <DataItem className="border-r border-neutral-700" label="Block" value={assist.block} />
                  <DataItem label="Hit Type" value={assist.hit} />
                </div>
                <div className="mt-3 flex border-t border-neutral-700 pt-2">
                  <Typography>{assist.description}</Typography>
                </div>
                {assist.attributes.length > 0 && (
                  <div>
                    <Typography className="uppercase" color="gray" variant="h4">
                      Attributes
                    </Typography>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {assist.attributes.map((a) => (
                        <Chip key={a}>
                          <Typography className="uppercase" component="span" variant="h4">
                            {a}
                          </Typography>
                        </Chip>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 rounded-2xl bg-neutral-800 p-4">
              <DataItem label="Start Up" value={assist.startUp} />
              <DataItem label="Active" value={assist.active} />
              <DataItem label="Recovery" value={assist.recovery} />
              <DataItem label="Alt. Recovery" value={assist.recoveryAlt} />
            </div>
            <div className="flex flex-wrap gap-4 rounded-2xl bg-neutral-800 p-4">
              <DataItem label="Hits" value={assist.hits} />
              <DataItem label="Damage" value={assist.dmg} />
              <DataItem label="Meter Gain" value={assist.meterGain} />
            </div>
            <div className="lg:w-4/5">
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
