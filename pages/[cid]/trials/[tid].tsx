import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Page from "components/Page";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { MarkdownComponents } from "helpers/markdown";
import { getTrial, getTrialIds } from "lib/trial";
import routes from "routes";
import { RawCharacter, RawCombo } from "types";
import Head from "components/Head";
import DataItem from "components/DataItem";

interface TrialProps {
  character: RawCharacter;
  content: MDXRemoteSerializeResult;
  trial: RawCombo;
  trials: Array<RawCombo>;
}

const Trial: NextPage<TrialProps> = (props) => {
  const { character, content, trial, trials } = props;
  return (
    <>
      <Head name={character.name} cid={character.id} move={trial.title} page="trial" />
      <Page>
        <Tree>
          <TreeSection label="Trials">
            {trials.map((t) => (
              <TreeItem key={t.title} to={routes.trial(character.id, t.id)}>
                {`${t.trial}. ${t.title}`}
              </TreeItem>
            ))}
          </TreeSection>
        </Tree>
        <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
          <div className="flex flex-col gap-y-4 lg:w-4/5">
            <header>
              <Typography color="aqua" component="p" className="uppercase" variant="h3">
                {character.name}
              </Typography>
              <Typography className="uppercase" variant="h1">
                {trial.title}
              </Typography>
            </header>
            <div className="relative h-0 w-full pb-[56.25%]">
              <iframe
                allowFullScreen
                className="absolute top-0 left-0 h-full w-full rounded-2xl"
                frameBorder="0"
                title="Trial video"
                src={`https://www.youtube.com/embed/${trial.videoId}?modestbranding=1`}
              />
            </div>
            <div className="rounded-2xl bg-neutral-800 p-4">
              <Typography color="gray" className="uppercase" variant="h4">
                Input
              </Typography>
              <Typography className="font-medium tracking-wider">{trial.input}</Typography>
            </div>
            <div className="flex flex-wrap gap-4 rounded-2xl bg-neutral-800 p-4">
              <DataItem label="Difficulty" value={trial.difficulty} />
              <DataItem label="Position" value={trial.position} />
              <DataItem label="Starter" value={trial.starter} />
              <DataItem label="X-Factor" value={trial.xfactor || "--"} />
            </div>
            <div className="flex flex-wrap gap-4 rounded-2xl bg-neutral-800 p-4">
              <DataItem label="Damage" value={trial.damage.toLocaleString("en")} />
              <DataItem label="Meter Start" value={trial.meterStart} />
              <DataItem label="Meter Build" value={trial.meterBuild} />
              <DataItem label="Meter Spend" value={trial.meterSpend} />
            </div>
            <div>
              <MDXRemote {...content} components={MarkdownComponents} />
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getTrialIds();
  return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
  tid: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { cid, tid } = context.params as IParams;
  const { content: mdx, ...rest } = getTrial(cid, tid);
  const content = await serialize(mdx);
  return {
    props: {
      ...rest,
      content,
    },
  };
};

export default Trial;
