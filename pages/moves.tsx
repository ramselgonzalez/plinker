import Container from "components/Container";
import DataRow from "components/DataRow";
import MovePreview from "components/MovePreview";
import MovePreviewContent from "components/MovePreviewContent";
import MovePreviewData from "components/MovePreviewData";
import MovePreviewExtraInfo from "components/MovePreviewExtraInfo";
import MovePreviewHeader from "components/MovePreviewHeader";
import MovePreviewImage from "components/MovePreviewImage";
import TreeView from "components/TreeView";
import Typography from "components/Typography";
import moves from "data";
import { NextPage } from "next";

const normals = moves.filter((m) => m.moveType === "Normal");
const commandNormals = moves.filter((m) => m.moveType === "Command Normal");
const snapback = moves.filter((m) => m.moveType === "Snap Back");
const throws = moves.filter((m) => m.moveType === "Throw");
const specials = moves.filter((m) => m.moveType === "Special");
const supers = moves.filter((m) => m.moveType === "Super");

const sections = [
  { id: "Normal", label: "Normals", nodes: normals, items: normals.map((n) => ({ id: n.id, label: n.name })) },
  {
    id: "Command Normal",
    label: "Command Normals",
    nodes: commandNormals,
    items: commandNormals.map((n) => ({ id: n.id, label: n.name })),
  },
  { id: "Snap Back", label: "Snap Back", nodes: snapback, items: snapback.map((n) => ({ id: n.id, label: n.name })) },
  { id: "Throw", label: "Throws", nodes: throws, items: throws.map((n) => ({ id: n.id, label: n.name })) },
  { id: "Special", label: "Specials", nodes: specials, items: specials.map((n) => ({ id: n.id, label: n.name })) },
  { id: "Super", label: "Supers", nodes: supers, items: supers.map((n) => ({ id: n.id, label: n.name })) },
];

const Moves: NextPage = () => {
  return (
    <Container className="moves-container">
      <aside className="movelist-tree">
        <TreeView sections={sections} />
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
                  <MovePreview id={n.id}>
                    <MovePreviewHeader>
                      <Typography color="gray" variant="h3">
                        {n.input}
                      </Typography>
                      <Typography className="text-shadow-white" variant="h2">
                        {n.name}
                      </Typography>
                    </MovePreviewHeader>
                    <MovePreviewContent>
                      <MovePreviewImage />
                      <MovePreviewData>
                        <DataRow label="Start Up" value={n.startUp} />
                        <DataRow label="Active" value={n.active} />
                        <DataRow label="Recovery" value={n.recovery} />
                        <DataRow label="Block Adv." value={n.blockAdv} />
                        <DataRow label="Hit Adv." value={n.hitAdv} />
                        <DataRow label="Damage" value={n.damage} />
                      </MovePreviewData>
                      <MovePreviewExtraInfo attributes={n.attributes ? n.attributes.split(", ") : []} notes={[]} />
                    </MovePreviewContent>
                  </MovePreview>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default Moves;
