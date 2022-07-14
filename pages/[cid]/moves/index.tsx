import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import Chip from "components/Chip";
import Drawer from "components/Drawer";
import Head from "components/Head";
import { ChevronRight, List } from "components/Icon";
import Link from "components/Link";
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
import { getInputColor } from "helpers";

interface MovesProps {
  character: RawCharacter;
  moves: Array<IMovePreview>;
}

const Moves: NextPage<MovesProps> = (props) => {
  const { character, moves } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
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
                className="paper group flex cursor-pointer overflow-hidden"
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
                <div className="relative hidden w-1/2 overflow-hidden border-l border-l-neutral-500 bg-neutral-700 md:block">
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
        <button onClick={() => setDrawerOpen(true)} className="fab lg:hidden">
          <List />
        </button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} position="right">
          <div className="flex h-14 items-center gap-4 border-b border-neutral-600 px-4">
            <button onClick={() => setDrawerOpen(false)}>
              <ChevronRight />
            </button>
            <Typography variant="h4" className="uppercase">
              Move List
            </Typography>
          </div>
          <ul className="-mt-2 px-5 py-4">
            {sections.map((s) => (
              <TreeSection key={s.label} label={s.label}>
                {s.items.map((n) => (
                  <TreeItem key={n.id} to={routes.move(cid, n.id)}>
                    {n.name}
                  </TreeItem>
                ))}
              </TreeSection>
            ))}
          </ul>
        </Drawer>
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
