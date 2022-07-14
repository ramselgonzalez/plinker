import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Chip from "components/Chip";
import Link from "components/Link";
import Head from "components/Head";
import Page from "components/Page";
import { AssistPreview } from "components/Table";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getAssistTypeColor } from "helpers";
import { getCharacterIds } from "lib/character";
import { getAssistPreviews } from "lib/assist";
import routes from "routes";
import { IAssistPreview } from "types";

interface AssistsProps {
  cname: string;
  assists: Array<IAssistPreview>;
}

const Assists: NextPage<AssistsProps> = (props) => {
  const { cname, assists } = props;
  const { query, push } = useRouter();
  const cid = query.cid as string;
  return (
    <>
      <Head cid={cid} name={cname} page="assists" />
      <Page>
        <Tree>
          <TreeSection label="Assists">
            {assists.map((s) => (
              <TreeItem key={s.id} to={routes.assist(cid, s.id)}>
                {s.name}
              </TreeItem>
            ))}
          </TreeSection>
        </Tree>
        <div className="mt-34 mb-8 w-page-content lg:pl-8">
          <header className="mb-2">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {cname}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Assists
            </Typography>
          </header>
          <ul className="grid gap-y-4 md:gap-y-6">
            {assists.map((a) => (
              <li
                className="group flex cursor-pointer flex-col rounded-2xl bg-neutral-800 shadow-md shadow-black/30 md:flex-row"
                id={a.id}
                key={a.id}
                onClick={() => push(routes.assist(cid, a.id))}
              >
                <div className="hidden w-1/2 p-6 md:block">
                  <AssistPreview assist={a} cid={cid} />
                </div>
                <div className="p-4 md:hidden">
                  <Link
                    className="mb-1 block uppercase group-hover:underline"
                    color="white"
                    href={routes.assist(cid, a.id)}
                    variant="h3"
                  >
                    {a.name}
                  </Link>
                  <Chip className={`h4 uppercase ${getAssistTypeColor(a.type)}`}>{a.type}</Chip>
                </div>
                <div className="relative mx-4 mb-4 h-52 overflow-hidden rounded-2xl border-neutral-500 bg-neutral-700 md:mx-0 md:mb-0 md:block md:h-auto md:w-1/2 md:rounded-l-none md:border-l">
                  <Image
                    alt={`${cname} being called in as an assist performing ${a.name}`}
                    layout="fill"
                    objectFit="cover"
                    src={`/images/${cid}/assists/${a.id}.jpg`}
                  />
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

export const getStaticProps: GetStaticProps<AssistsProps> = (context) => {
  const { cid } = context.params as IParams;
  const data = getAssistPreviews(cid);
  return {
    props: {
      cname: data.cname,
      assists: data.assists,
    },
  };
};

export default Assists;
