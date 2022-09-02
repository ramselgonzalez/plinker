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
      <Head cid={character.id} name={character.name} page="trials" />
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
        <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
          <header className="mb-2">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Trials
            </Typography>
          </header>
          <ul className="grid w-full gap-y-4 md:gap-y-6 lg:w-[800px]">
            {trials.map((c) => (
              <li className="paper p-6" key={c.id}>
                <div className="flex items-center gap-x-2">
                  <div className="avatar">{c.trial}</div>
                  <div className="w-full">
                    <Link className="uppercase" color="white" href={routes.trial(cid, c.id)} variant="h3">
                      {c.title}
                    </Link>
                  </div>
                </div>
                <div>
                  <Typography className="border-b border-neutral-500 pb-2">{c.description}</Typography>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Chip className={getTrialDifficultyColor(c.difficulty)}>
                      <Typography className="uppercase" component="span" variant="h4">
                        {c.difficulty}
                      </Typography>
                    </Chip>
                    <Chip>
                      <Typography className="uppercase" component="span" variant="h4">
                        {c.position}
                      </Typography>
                    </Chip>
                    <Chip>
                      <Typography className="uppercase" component="span" variant="h4">
                        {c.starter}
                      </Typography>
                    </Chip>
                    <Chip>
                      <Typography className="uppercase" component="span" variant="h4">
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
