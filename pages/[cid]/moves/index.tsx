// packages
import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
// components
import Drawer from "components/Drawer";
import Head from "components/Head";
import { List } from "components/Icon";
import MoveCard from "components/MoveCard";
import Page from "components/Page";
import PageFooter, { PageFooterLinkType } from "components/PageFooter";
import PageHeader from "components/PageHeader";
import TableOfContents, { TableOfContentsItem } from "components/TableOfContents";
// utils
import { getCharacterIds } from "lib/character";
import { getMovePreviews } from "lib/move";
import routes from "routes";
import { MoveTypeValues, IMovePreview, RawCharacter } from "types";

interface MovesProps {
  character: RawCharacter;
  moves: Array<IMovePreview>;
  nextRoute: PageFooterLinkType;
  previousRoute: PageFooterLinkType;
  toc: Array<TableOfContentsItem>;
}

const Moves: NextPage<MovesProps> = (props) => {
  const { character, moves, nextRoute, previousRoute, toc } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Page>
      <Head cid={character.id} name={character.name} page="moves" />
      <TableOfContents label="Move List" contents={toc} />
      <div className="mt-30 w-page-content md:mb-8 md:mt-34 lg:pl-8">
        <PageHeader heading="Move List" subheading={character.name} />
        <ul className="grid gap-y-6 md:mx-0">
          {moves.map((m) => (
            <li key={m.id}>
              <MoveCard move={m} href={routes.move(character.id, m.id)} />
            </li>
          ))}
        </ul>
        <PageFooter previousRoute={previousRoute} nextRoute={nextRoute} />
      </div>
      <button className="fab lg:hidden" onClick={() => setDrawerOpen(true)}>
        <List />
      </button>
      <Drawer heading="Move List" onClose={() => setDrawerOpen(false)} open={drawerOpen} position="right">
        <TableOfContents contents={toc} isDrawerToc label="Contents" onSelectItem={() => setDrawerOpen(false)} />
      </Drawer>
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

function getMoveListTableOfContents(cid: string, moves: Array<IMovePreview>): Array<TableOfContentsItem> {
  const contents = [];
  for (const type of MoveTypeValues) {
    const items = moves.filter((m) => m.type === type);
    if (items.length > 0) {
      contents.push({ label: `${type}s`, depth: 0 });
      for (const item of items) {
        contents.push({ label: item.name, to: routes.move(cid, item.id), depth: 1 });
      }
    }
  }
  return contents;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { cid } = context.params as IParams;
  const { moves, character } = getMovePreviews(cid);
  const toc = getMoveListTableOfContents(cid, moves);
  const previousRoute = { heading: "Overview", subheading: character.name, href: routes.overview(character.id) };
  const nextRoute = { heading: "Assists", subheading: character.name, href: routes.assists(character.id) };
  return {
    props: { character, moves, nextRoute, previousRoute, toc },
  };
};

export default Moves;
