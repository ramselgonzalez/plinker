import Head from "next/head";
import { useRouter } from "next/router";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Chip from "components/Chip";
import Container from "components/Container";
import DataRow from "components/DataRow";
import List from "components/List";
import MovePreview from "components/MovePreview";
import MovePreviewContent from "components/MovePreviewContent";
import MovePreviewHeader from "components/MovePreviewHeader";
import MovePreviewImage from "components/MovePreviewImage";
import Tree from "components/Tree";
import Typography from "components/Typography";
import TreeSection from "components/TreeSection";
import TreeItem from "components/TreeItem";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import ListItem from "components/ListItem";
import { getCharacterIds, getCharacterName, getMovePreviews } from "lib/characters";
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
  name: string;
  moves: Array<IMovePreview>;
}

const Moves: NextPage<MovesProps> = (props) => {
  const { name, moves } = props;
  const { query } = useRouter();

  const sections = [];
  for (const type of MoveTypeValues) {
    const items = moves.filter((m) => m.moveType === type);
    if (items.length > 0) {
      sections.push({ items, label: type + "s" });
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle(name)}</title>
        <meta property="og:title" content={getOpenGraphTitle(name)} />
        <meta property="og:description" content={getOpenGraphDescription(name)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performing Gohadoken L" />
        <meta property="og:image" content={getOpenGraphImage(name)} />
      </Head>
      <Container className="moves-container">
        <aside className="movelist-tree">
          <Tree>
            {sections.map((s) => (
              <TreeSection key={s.label} label={s.label}>
                {s.items.map((n) => (
                  <TreeItem key={n.id} id={n.id}>
                    {n.name}
                  </TreeItem>
                ))}
              </TreeSection>
            ))}
          </Tree>
        </aside>
        <List>
          {sections.map((s) => (
            <ListItem className="move-list-section" key={s.label}>
              <Typography className="underline" color="blue" gutter shadow uppercase variant="h4">
                {s.label}
              </Typography>
              <List className="moves-sub-list">
                {s.items.map((m) => (
                  <ListItem key={m.id}>
                    <MovePreview id={m.id} to={`/${query.cid}/${m.id}`}>
                      <MovePreviewHeader>
                        <Typography color="gray" variant="h4">
                          {m.input}
                        </Typography>
                        <Typography className="move-preview-heading" shadow uppercase variant="h2">
                          {m.name}
                        </Typography>
                        {m.attributes.length > 0 && (
                          <div className="chips">
                            {m.attributes.map((a) => (
                              <Chip key={a}>{a}</Chip>
                            ))}
                          </div>
                        )}
                      </MovePreviewHeader>
                      <MovePreviewContent>
                        <MovePreviewImage alt="Akuma performing Gohadoken L" src="/images/moves/akuma-fireball.png" />
                        <StatSection className="move-preview-data">
                          <StatSectionHeader>Frame Data</StatSectionHeader>
                          <DataRow label="Damage" value={m.damage} />
                          <DataRow label="Start Up" value={m.startUp} />
                          <DataRow label="Active" value={m.active} />
                          <DataRow label="Recovery" value={m.recovery} />
                          <DataRow label="Block Adv." value={m.blockAdv} />
                          <DataRow label="Hit Adv." value={m.hitAdv} />
                        </StatSection>
                      </MovePreviewContent>
                    </MovePreview>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </Container>
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
  const moves = getMovePreviews(cid);
  const name = getCharacterName(cid);
  return {
    props: {
      name,
      moves,
    },
  };
};

export default Moves;
