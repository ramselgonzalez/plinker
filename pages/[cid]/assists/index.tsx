import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "components/Head";
import Page from "components/Page";
import { AssistPreview } from "components/Table";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getCharacterIds } from "lib/character";
import { getAssistPreviews } from "lib/assist";
import { IAssistPreview } from "types";
import routes from "routes";

interface AssistsProps {
  cname: string;
  assists: Array<IAssistPreview>;
}

const Assists: NextPage<AssistsProps> = (props) => {
  const { cname, assists } = props;
  const router = useRouter();
  const cid = router.query.cid as string;
  return (
    <>
      <Head page="assists" cid={cid} name={cname} />
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
        <div className="mt-34 mb-8 w-page-content pl-8">
          <header className="mb-2">
            <Typography color="aqua" component="p" className="uppercase" variant="h3">
              {cname}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Assists
            </Typography>
          </header>
          <ul className="grid gap-y-6">
            {assists.map((a) => (
              <li key={a.id} id={a.id}>
                <div className="flex bg-neutral-800 md:rounded-2xl">
                  <div className="w-1/2 p-6">
                    <AssistPreview cid={cid} assist={a} />
                  </div>
                  <div className="relative w-1/2 overflow-hidden rounded-r-2xl border-l border-l-neutral-500 bg-neutral-700">
                    <Image
                      alt={`${cname} being called in as an assist performing ${a.name}`}
                      layout="fill"
                      src={`/images/${cid}/assists/${a.id}.jpg`}
                      objectFit="cover"
                    />
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
