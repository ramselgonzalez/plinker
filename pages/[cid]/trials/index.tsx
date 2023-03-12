// packages
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
// components
import Drawer from "components/Drawer";
import Head from "components/Head";
import { List } from "components/Icon";
import Page from "components/Page";
import PageFooter, { PageFooterLinkType } from "components/PageFooter";
import TableOfContents, { TableOfContentsItem } from "components/TableOfContents";
import TrialCard from "components/TrialCard";
import Typography from "components/Typography";
// utils
import { getCharacterIds } from "lib/character";
import { getTrials } from "lib/trial";
import routes from "routes";
import { RawCharacter, RawCombo } from "types";
import PageHeader from "components/PageHeader";

interface TrialsProps {
  character: RawCharacter;
  previousRoute: PageFooterLinkType;
  toc: Array<TableOfContentsItem>;
  trials: Array<RawCombo>;
}

const Trials: NextPage<TrialsProps> = (props) => {
  const { character, previousRoute, toc, trials } = props;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { query } = useRouter();
  const cid = query.cid as string;
  return (
    <Page>
      <Head cid={character.id} name={character.name} page="trials" />
      <TableOfContents label="Trials" contents={toc} />
      <div className="mt-30 mb-8 w-page-content md:mt-34 lg:pl-8">
        <PageHeader heading="Trials" subheading={character.name} />
        <ul className="mt-4 grid w-full gap-y-4 md:gap-y-6">
          {trials.map((c) => (
            <li key={c.id}>
              <TrialCard trial={c} href={routes.trial(cid, c.id)} />
            </li>
          ))}
        </ul>
        <PageFooter previousRoute={previousRoute} />
      </div>
      <button className="fab lg:hidden" onClick={() => setDrawerOpen(true)}>
        <List />
      </button>
      <Drawer heading="Trials" onClose={() => setDrawerOpen(false)} open={drawerOpen} position="right">
        <TableOfContents
          contents={toc}
          isDrawerToc
          label="Table of Contents"
          onSelectItem={() => setDrawerOpen(false)}
        />
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

function getTableOfContents(cid: string, trials: Array<RawCombo>): Array<TableOfContentsItem> {
  return trials.map((t) => ({
    label: `${t.trial}. ${t.title}`,
    depth: 0,
    to: routes.trial(cid, t.id),
  }));
}

export const getStaticProps: GetStaticProps<TrialsProps> = async (context) => {
  const { cid } = context.params as IParams;
  const { character, trials } = getTrials(cid);
  const toc = getTableOfContents(character.id, trials);
  const previousRoute = { heading: "Assists", subheading: character.name, href: routes.assists(character.id) };
  return {
    props: {
      character,
      previousRoute,
      toc,
      trials,
    },
  };
};

export default Trials;
