import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import Head from "components/Head";
import Page from "components/Page";
import { MovePreview } from "components/Table";
import Tree from "components/Tree";
import TreeItem from "components/TreeItem";
import TreeSection from "components/TreeSection";
import Typography from "components/Typography";
import { getCharacterIds } from "lib/character";
import { getMovePreviews } from "lib/move";
import routes from "routes";
import { MoveTypeValues, IMovePreview, RawCharacter } from "types";
import { BLUR_DATA_URL } from "helpers/images";

interface MovesProps {
  character: RawCharacter;
  moves: Array<IMovePreview>;
}

const Moves: NextPage<MovesProps> = (props) => {
  const { character, moves } = props;
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
      <Head page="moves" name={character.name} cid={cid} />
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
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Move List
            </Typography>
          </header>
          <ul className="grid gap-y-6">
            {moves.map((m) => (
              <li key={m.id} className="flex bg-neutral-800 md:rounded-2xl">
                <div className="w-1/2 p-6">
                  <MovePreview cid={cid} move={m} />
                </div>
                <div className="relative w-1/2 overflow-hidden rounded-r-2xl border-l border-l-neutral-500 bg-neutral-700">
                  <Image
                    alt={`${character.name} performing ${m.name}`}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    src={`/images/${cid}/moves/${m.id}.jpg`}
                    objectFit="cover"
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

export const getStaticProps: GetStaticProps = async (context) => {
  const { cid } = context.params as IParams;
  const data = getMovePreviews(cid);
  return {
    props: { ...data },
  };
};

export default Moves;
