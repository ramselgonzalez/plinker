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
import Chip from "components/Chip";
import { getInputColor } from "helpers";
import Link from "components/Link";

interface MovesProps {
  character: RawCharacter;
  moves: Array<IMovePreview>;
}

const Moves: NextPage<MovesProps> = (props) => {
  const { character, moves } = props;
  const { query, push } = useRouter();
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
        <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
          <header className="mb-2">
            <Typography className="uppercase" color="aqua" component="p" variant="h3">
              {character.name}
            </Typography>
            <Typography className="uppercase" variant="h1">
              Move List
            </Typography>
          </header>
          <ul className="grid gap-y-4 md:gap-y-6">
            {moves.map((m) => (
              <li
                key={m.id}
                className="group flex cursor-pointer rounded-2xl border-neutral-500 bg-neutral-800 shadow-md shadow-black/30"
                onClick={() => push(routes.move(cid, m.id))}
              >
                <div className="p-4 md:hidden">
                  <Link href={routes.move(cid, m.id)} variant="h3" color="white" className="mb-1 block uppercase">
                    {m.name}
                  </Link>
                  <Chip className="h4 normal-case" color={getInputColor(m.input)}>
                    {m.input}
                  </Chip>
                </div>
                <div className="hidden w-1/2 p-6 md:block">
                  <MovePreview cid={cid} move={m} />
                </div>
                <div className="relative hidden w-1/2 overflow-hidden rounded-r-2xl border-l border-l-neutral-500 bg-neutral-700 md:block">
                  <Image
                    alt={m.imgAlt}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                    src={m.imgUrl}
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
