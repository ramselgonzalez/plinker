import Head from "next/head";
import { NextPage } from "next";
import Container from "components/Container";
import DataRow from "components/DataRow";
import MovePreview from "components/MovePreview";
import MovePreviewContent from "components/MovePreviewContent";
import MovePreviewData from "components/MovePreviewData";
import MovePreviewExtraInfo from "components/MovePreviewExtraInfo";
import MovePreviewHeader from "components/MovePreviewHeader";
import MovePreviewImage from "components/MovePreviewImage";
import Tree from "components/Tree";
import Typography from "components/Typography";
import moves from "data";
import TreeSection from "components/TreeSection";
import TreeItem from "components/TreeItem";

const normals = moves.filter((m) => m.moveType === "Normal");
const commandNormals = moves.filter((m) => m.moveType === "Command Normal");
const snapback = moves.filter((m) => m.moveType === "Snap Back");
const throws = moves.filter((m) => m.moveType === "Throw");
const specials = moves.filter((m) => m.moveType === "Special");
const supers = moves.filter((m) => m.moveType === "Super");

const sections = [
  { id: "Normal", label: "Normals", nodes: normals },
  {
    id: "Command Normal",
    label: "Command Normals",
    nodes: commandNormals,
  },
  { id: "Snap Back", label: "Snap Back", nodes: snapback },
  { id: "Throw", label: "Throws", nodes: throws },
  { id: "Special", label: "Specials", nodes: specials },
  { id: "Super", label: "Supers", nodes: supers },
];

const Moves: NextPage = () => {
  return (
    <>
      <Head>
        <title>Akuma / Moves / Plinker</title>
        <meta property="og:title" content="Akuma - Moves | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:description" content="Frame data and details for Akuma's movelist." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
      </Head>
      <Container className="moves-container">
        <aside className="movelist-tree">
          <Tree>
            {sections.map((s) => (
              <TreeSection key={s.id} label={s.label}>
                {s.nodes.map((n) => (
                  <TreeItem key={n.id} id={n.id}>
                    {n.name}
                  </TreeItem>
                ))}
              </TreeSection>
            ))}
          </Tree>
        </aside>
        <ul>
          {sections.map((s) => (
            <li className="move-list-section" key={s.id}>
              <Typography color="blue" variant="h3" className="underline uppercase bottom-gutter text-shadow-blue">
                {s.label}
              </Typography>
              <ul className="moves-sub-list">
                {s.nodes.map((n) => (
                  <li key={n.id}>
                    <MovePreview id={n.id} to="/move">
                      <MovePreviewHeader>
                        <Typography color="gray" variant="subheading1">
                          {n.input}
                        </Typography>
                        <Typography shadow uppercase variant="h2">
                          {n.name}
                        </Typography>
                      </MovePreviewHeader>
                      <MovePreviewContent>
                        <MovePreviewImage alt="Akuma performing Gohadoken L" src="/images/moves/akuma-fireball.png" />
                        <MovePreviewData>
                          <DataRow label="Start Up" value={n.startUp} />
                          <DataRow label="Active" value={n.active} />
                          <DataRow label="Recovery" value={n.recovery} />
                          <DataRow label="Block Adv." value={n.blockAdv} />
                          <DataRow label="Hit Adv." value={n.hitAdv} />
                          <DataRow label="Damage" value={n.damage} />
                        </MovePreviewData>
                        <MovePreviewExtraInfo
                          attributes={n.attributes ? n.attributes.split(", ") : []}
                          notes={n.notes ? n.notes.split(". ") : []}
                        />
                      </MovePreviewContent>
                    </MovePreview>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Moves;
