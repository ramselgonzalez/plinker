import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Row from "components/Row";
import MovePreview from "components/MovePreview";
import Page from "components/Page";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getCharacterIds, getMovePreviews } from "lib/characters";
import routes from "routes";
import { MoveTypeValues, IMovePreview } from "types";

function getPageTitle(name: string) {
  return `${name} / Moves / Plinker`;
}

function getOpenGraphTitle(name: string) {
  return `${name} | Moves`;
}

function getOpenGraphDescription(name: string) {
  return `Frame data and details for ${name}'s movelist.`;
}

function getOpenGraphImage(cid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/akuma-fireball.png`;
}

interface MovesProps {
  cname: string;
  moves: Array<IMovePreview>;
}

const Moves: NextPage<MovesProps> = (props) => {
  const { cname, moves } = props;
  const { query } = useRouter();
  const cid = query.cid as string;
  const sections = [];
  for (const type of MoveTypeValues) {
    const items = moves.filter((m) => m.type === type);
    if (items.length > 0) {
      sections.push({ items, label: type + "s", id: type.replace(" ", "-").toLowerCase() + "s" });
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(cname)}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname)} />
        <meta property="og:description" content={getOpenGraphDescription(cname)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="" />
        <meta property="og:image" content={getOpenGraphImage(cname)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Page>
        <Tree>
          {sections.map((s) => (
            <TreeSection key={s.label} label={s.label}>
              {s.items.map((n) => (
                <TreeItem key={n.id} to={routes.move(cid, n.id)}>
                  {n.name}
                </TreeItem>
              ))}
            </TreeSection>
          ))}
        </Tree>
        <div className="mt-34 mb-8 w-page-content pl-8">
          <header className="mb-2">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {cname}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Move List
            </Typography>
          </header>
          <ul className="my-4 mt-4 grid auto-rows-min gap-y-6 first:mt-0">
            {moves.map((m) => (
              <li key={m.id}>
                <MovePreview>
                  <StatSection className="w-1/2 py-6 px-6">
                    <StatSectionHeader>
                      <Link href={routes.move(cid, m.id)}>
                        <a id={m.id} className="text-cyan-300 hover:underline">
                          <Typography color="aqua" className="uppercase" variant="h3">
                            {m.name}
                          </Typography>
                        </a>
                      </Link>
                    </StatSectionHeader>
                    <Row label="Start Up" value={m.startUp} />
                    <Row label="Active" value={m.active} />
                    <Row label="Recovery" value={m.recovery} />
                    <Row label="Block Adv." value={m.advBlock} />
                    <Row label="Hit Adv." value={m.advHit} />
                  </StatSection>
                  <div className="relative w-1/2 overflow-hidden rounded-r-2xl border-l border-l-neutral-500 bg-neutral-700">
                    <Image alt="Test" layout="fill" src={`/images/${cid}/moves/${m.id}.jpg`} objectFit="cover" />
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

export const getStaticProps: GetStaticProps = (context) => {
  const { cid } = context.params as IParams;
  const { moves, cname } = getMovePreviews(cid);
  return {
    props: {
      cname,
      moves,
    },
  };
};

export default Moves;
