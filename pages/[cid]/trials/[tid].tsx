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
        <div className="mt-34 mb-8 w-page-content pl-8">
          <header>
            <header className="mb-2">
              <Typography color="aqua" component="p" className="uppercase" variant="h3">
                {character.name}
              </Typography>
              <Typography className="uppercase" variant="h1">
                {trial.title}
              </Typography>
            </header>
          </header>
          <div className="flex w-4/5 flex-col gap-y-4">
            <div className="relative h-0 w-full rounded-2xl pb-[56.25%]">
              <iframe
                allowFullScreen
                className="absolute top-0 left-0 h-full w-full rounded-3xl"
                frameBorder="0"
                title="Trial video"
                src={`https://www.youtube.com/embed/${trial.videoId}`}
              />
            </div>
            <div className="rounded-2xl bg-neutral-800 p-4">
              <Typography color="gray" className="uppercase" variant="h4">
                Input
              </Typography>
              <Typography className="font-medium tracking-wider">{trial.input}</Typography>
            </div>
            <div className="flex rounded-2xl bg-neutral-800 p-4">
              <div className="flex-1 border-r border-neutral-700 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Difficulty
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.difficulty}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Position
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.position}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Starter
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.starter}
                </Typography>
              </div>
              <div className="flex-1 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  X-Factor
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.xfactor || "--"}
                </Typography>
              </div>
            </div>
            <div className="flex rounded-2xl bg-neutral-800 p-4">
              <div className="flex-1 border-r border-neutral-700 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Damage
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.damage.toLocaleString("en")}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Meter Start
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.meterStart}
                </Typography>
              </div>
              <div className="flex-1 border-r border-neutral-700 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Meter Build
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.meterBuild}
                </Typography>
              </div>
              <div className="flex-1 text-center">
                <Typography color="gray" className="uppercase" variant="h4">
                  Meter Spend
                </Typography>
                <Typography component="p" className="uppercase" variant="h3">
                  {trial.meterSpend}
                </Typography>
              </div>
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
