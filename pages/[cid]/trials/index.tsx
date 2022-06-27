import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import cn from "classnames";
import Page from "components/Page";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getCharacterIds, getTrials } from "lib/characters";
import routes from "routes";
import { RawCombo } from "types";
import Chip from "components/Chip";

interface TrialsProps {
  combos: Array<RawCombo>;
  cname: string;
}

const Trials: NextPage<TrialsProps> = (props) => {
  const { cname, combos } = props;
  const { query } = useRouter();
  const cid = query.cid as string;

  return (
    <Page>
      <Tree>
        <TreeSection label="Trials">
          {combos.map((c) => (
            <TreeItem key={c.title} to={routes.trial(cid, c.id)}>
              {`${c.trial}. ${c.title}`}
            </TreeItem>
          ))}
        </TreeSection>
      </Tree>
      <div className="mt-34 mb-8 w-page-content pl-8">
        <header className="mb-2">
          <Typography color="aqua" component="p" className="uppercase" variant="h3">
            {cname}
          </Typography>
          <Typography className="uppercase" variant="h1">
            Trials
          </Typography>
        </header>
        <ul className="grid w-3/5 gap-y-6">
          {combos.map((c) => (
            <li key={c.title}>
              <div className="flex flex-col bg-neutral-800 p-6 md:rounded-2xl">
                <div className="flex items-start gap-x-4">
                  <div className="relative mt-1 flex h-10 w-10 shrink-0 select-none items-center justify-center rounded-full bg-neutral-600 text-xl font-semibold">
                    {c.trial}
                  </div>
                  <div className="w-full">
                    <Link href={routes.trial(cid, c.id)}>
                      <a className="inline-block text-cyan-300 hover:underline">
                        <Typography className="uppercase" color="aqua" variant="h3">
                          {c.title}
                        </Typography>
                      </a>
                    </Link>
                    <Typography>{c.description}</Typography>
                    <div className="mt-2 flex gap-x-2 border-t border-neutral-500 pt-2">
                      <Chip
                        className={cn("uppercase", {
                          ["bg-green-700"]: c.difficulty === "Very Easy",
                          ["bg-green-800"]: c.difficulty === "Easy",
                          ["bg-yellow-700"]: c.difficulty === "Medium",
                          ["bg-red-600"]: c.difficulty === "Hard",
                          ["bg-red-900"]: c.difficulty === "Very Hard",
                        })}
                      >
                        <Typography className="uppercase" variant="h4">
                          {c.difficulty}
                        </Typography>
                      </Chip>
                      <Chip>
                        <Typography className="uppercase" variant="h4">
                          {c.position}
                        </Typography>
                      </Chip>
                      <Chip>
                        <Typography className="uppercase" variant="h4">
                          {c.starter}
                        </Typography>
                      </Chip>
                      <Chip>
                        <Typography className="uppercase" variant="h4">
                          {c.assistId ? "Assited" : "Solo"}
                        </Typography>
                      </Chip>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Page>
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
  const { combos, cname } = getTrials(cid);
  return {
    props: {
      cname,
      combos,
    },
  };
};

export default Trials;
