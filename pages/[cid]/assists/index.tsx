// packages
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
// components
import Link from "components/Link";
import Head from "components/Head";
import Page from "components/Page";
import Typography from "components/Typography";
import { getAssistTypeColor } from "helpers";
import { getCharacterIds } from "lib/character";
import { getAssistPreviews } from "lib/assist";
import routes from "routes";
import { IAssistPreview, RawCharacter } from "types";
import { ChevronLeft, ChevronRight, List } from "components/Icon";
import Drawer from "components/Drawer";
import { useState } from "react";
import TableOfContents, { TableOfContentsItem } from "components/TableOfContents";
import AssistCard from "components/AssistCard";
import PageHeader from "components/PageHeader";
import PageFooter, { PageFooterLinkType } from "components/PageFooter";

interface AssistsProps {
  assists: Array<IAssistPreview>;
  character: RawCharacter;
  nextRoute: PageFooterLinkType;
  previousRoute: PageFooterLinkType;
  toc: Array<TableOfContentsItem>;
}

const Assists: NextPage<AssistsProps> = (props) => {
  const { assists, character, nextRoute, previousRoute, toc } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { query, push } = useRouter();
  const cid = query.cid as string;
  return (
    <>
      <Head cid={cid} name={character.name} page="assists" />
      <Page>
        <TableOfContents contents={toc} label="Assists" />
        <div className="mt-34 mb-8 w-page-content lg:pl-8">
          <PageHeader heading="Trials" subheading={character.name} />
          <ul className="mt-4 grid gap-y-4 md:gap-y-6">
            {assists.map((a) => (
              <li key={a.id}>
                <AssistCard assist={a} href={routes.assist(cid, a.id)} />
              </li>
            ))}
          </ul>
          <PageFooter nextRoute={nextRoute} previousRoute={previousRoute} />
        </div>
        <button className="fab lg:hidden" onClick={() => setDrawerOpen(true)}>
          <List />
        </button>
        <Drawer heading="Assists" onClose={() => setDrawerOpen(false)} open={drawerOpen} position="right">
          <TableOfContents contents={toc} isDrawerToc label="Contents" onSelectItem={() => setDrawerOpen(false)} />
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

function getTableOfContents(cid: string, assists: Array<IAssistPreview>): Array<TableOfContentsItem> {
  return assists.map((a) => ({
    label: a.name,
    depth: 0,
    to: routes.assist(cid, a.id),
  }));
}

export const getStaticProps: GetStaticProps<AssistsProps> = (context) => {
  const { cid } = context.params as IParams;
  const { assists, character } = getAssistPreviews(cid);
  const toc = getTableOfContents(cid, assists);
  const nextRoute = { heading: "Trials", subheading: character.name, href: routes.trials(character.id) };
  const previousRoute = { heading: "Moves", subheading: character.name, href: routes.moves(character.id) };
  return {
    props: {
      assists,
      character,
      nextRoute,
      previousRoute,
      toc,
    },
  };
};

export default Assists;
