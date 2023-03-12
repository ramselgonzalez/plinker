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
import { highlightInputNotation } from "helpers/input";

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
      <Head cid={character.id} move={trial.title} name={character.name} page="trial" />
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
              <Typography className="uppercase" color="aqua" component="p" variant="h3">
                {character.name}
              </Typography>
              <Typography className="uppercase" variant="h1">
                {trial.title}
              </Typography>
            </header>
            <div className="-mx-4 md:mx-0">
              <div className="relative h-0 w-full pb-[56.25%]">
                <iframe
                  className="absolute top-0 left-0 h-full w-full md:rounded-2xl"
                  src={`https://www.youtube-nocookie.com/embed/${trial.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
            <div className="paper p-4">
              <Typography className="uppercase" color="gray" variant="h4">
                Input
              </Typography>
              <div
                className="mt-2 rounded-xl bg-neutral-900 p-4 font-mono text-sm"
                dangerouslySetInnerHTML={{ __html: highlightInputNotation(trial.input) }}
              />
            </div>
            <div className="paper flex flex-wrap gap-4 p-4">
              <DataItem className="flex-1" label="Difficulty" value={trial.difficulty} />
              <DataItem className="flex-1" label="Position" value={trial.position} />
              <DataItem className="flex-1" label="Starter" value={trial.starter} />
              <DataItem className="flex-1" label="X-Factor" value={trial.xfactor || "--"} />
            </div>
            <div className="paper flex flex-wrap gap-4 p-4">
              <DataItem className="flex-1" label="Damage" value={trial.damage} />
              <DataItem className="flex-1" label="Meter Start" value={trial.meterStart} />
              <DataItem className="flex-1" label="Meter Build" value={trial.meterBuild} />
              <DataItem className="flex-1" label="Meter Spend" value={trial.meterSpend} />
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
