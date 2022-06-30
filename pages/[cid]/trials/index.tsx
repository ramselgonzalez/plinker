import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Head from "components/Head";
import Chip from "components/Chip";
import Link from "components/Link";
import Page from "components/Page";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getCharacterIds } from "lib/character";
import { getTrials } from "lib/trial";
import { getTrialDifficultyColor } from "helpers";
import routes from "routes";
import { RawCharacter, RawCombo } from "types";

interface TrialsProps {
  trials: Array<RawCombo>;
  character: RawCharacter;
}

const Trials: NextPage<TrialsProps> = (props) => {
  const { character, trials } = props;
  const { query } = useRouter();
  const cid = query.cid as string;

  return (
    <>
      <Head name={character.name} cid={character.id} page="trials" />
      <Page>
        <Tree>
          <TreeSection label="Trials">
            {trials.map((c) => (
              <TreeItem key={c.title} to={routes.trial(cid, c.id)}>
                {`${c.trial}. ${c.title}`}
              </TreeItem>
            ))}
          </TreeSection>
        </Tree>
        <div className="mt-34 mb-8 w-page-content pl-8">
          <header className="mb-2">
            <Typography color="aqua" component="p" className="uppercase" variant="h3">
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Trials
            </Typography>
          </header>
          <ul className="grid w-3/5 gap-y-6">
            {trials.map((c) => (
              <li key={c.id} className="flex items-start gap-x-4 bg-neutral-800 p-6 md:rounded-2xl">
                <div className="mt-1 flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-neutral-600 text-xl font-semibold">
                  {c.trial}
                </div>
                <div className="w-full">
                  <Link href={routes.trial(cid, c.id)} className="uppercase" variant="h3">
                    {c.title}
                  </Link>
                  <Typography>{c.description}</Typography>
                  <div className="mt-2 flex gap-x-2 border-t border-neutral-500 pt-2">
                    <Chip className={getTrialDifficultyColor(c.difficulty)}>
                      <Typography component="span" className="uppercase" variant="h4">
                        {c.difficulty}
                      </Typography>
                    </Chip>
                    <Chip>
                      <Typography component="span" className="uppercase" variant="h4">
                        {c.position}
                      </Typography>
                    </Chip>
                    <Chip>
                      <Typography component="span" className="uppercase" variant="h4">
                        {c.starter}
                      </Typography>
                    </Chip>
                    <Chip>
                      <Typography component="span" className="uppercase" variant="h4">
                        {c.assistId ? "Assited" : "Solo"}
                      </Typography>
                    </Chip>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Page>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getCharacterIds();
  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { cid } = context.params as IParams;
  const data = getTrials(cid);
  return {
    props: { ...data },
  };
};

export default Trials;
