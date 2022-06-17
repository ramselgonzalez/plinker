import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Page from "components/Page";
import Row from "components/Row";
import MovePreview from "components/MovePreview";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getCharacterIds, getAssistPreviews } from "lib/characters";
import { IAssistPreview } from "types";
import routes from "routes";

function getPageTitle(name: string) {
  return `${name} / Assists / Plinker`;
}

function getOpenGraphTitle(name: string) {
  return `${name} | Assists`;
}

function getOpenGraphDescription(name: string) {
  return `Frame data and details for ${name}'s assists.`;
}

function getOpenGraphImage(cid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/akuma-fireball.png`;
}

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
      <Head>
        <title>{getPageTitle(cname)}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname)} />
        <meta property="og:description" content={getOpenGraphDescription(cname)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
        <meta property="og:image" content={getOpenGraphImage(cname)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
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
                <MovePreview>
                  <StatSection className="w-1/2 py-6 px-6">
                    <StatSectionHeader>
                      <Link href={routes.assist(cid, a.id)}>
                        <a id={a.id} className="text-cyan-300 hover:underline">
                          <Typography className="uppercase" color="aqua" variant="h3">
                            {a.name}
                          </Typography>
                        </a>
                      </Link>
                    </StatSectionHeader>
                    <Row label="Start Up" value={a.startUp} />
                    <Row label="Active" value={a.active || "--"} />
                    <Row label="Recovery" value={a.recovery} />
                    <Row label="Alt. Assist Recovery" value={a.recoveryAlt} />
                    <Row label="Damage" value={a.dmg} />
                    <Row label="Team Hyper" value={a.thc} />
                  </StatSection>
                  <div className="relative w-1/2 overflow-hidden rounded-r-2xl border-l border-l-neutral-500 bg-neutral-700">
                    <Image
                      alt={`${cname} being called in as an assist performing ${a.name}`}
                      layout="fill"
                      src={`/images/${cid}/assists/${a.id}.jpg`}
                      objectFit="cover"
                    />
                  </div>
                </MovePreview>
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
