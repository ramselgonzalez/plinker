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
import Typography from "components/Typography";

const assists = [
  {
    type: "Alpha",
    name: "Plasma Beam M",
    startUp: "46",
    active: "20",
    recovery: "108",
    altRecovery: "78",
    damage: "113,600",
    meterGain: "1280",
    thc: "Photon Array",
    attributes: [],
    notes: [
      "Beam Durability: 8 frames x 1 low priority durability point.",
      "Appears slightly behind point characters.",
      "Recommended assist for ground-based rushdown characters.",
    ],
  },
  {
    type: "Beta",
    name: "Hidden Missiles",
    startUp: "50",
    active: "37",
    recovery: "147",
    altRecovery: "117",
    damage: "93,500",
    meterGain: "160 per missile",
    thc: "Photon Array",
    attributes: ["OTG"],
    notes: [
      "Each missile has 1 durability point.",
      "Considered one of the best assists in the game.",
      "Recommended assist for characters who have quick projectile that can cover the start up of the assist.",
    ],
  },
  {
    type: "Gamma",
    name: "Molecular Shield M",
    startUp: "34",
    active: "26",
    recovery: "124",
    altRecovery: "94",
    damage: "111,800",
    meterGain: "1400",
    thc: "Sphere Flame",
    attributes: [],
    notes: [
      "Initial barrier lasts for 25 frames and inflicts 1 low priority durability point of damage per frame.",
      "Four rocks fired after initial 25 frames, each with 1 low priority durability point.",
      "Due to its quick start up, functions well as a strong 'get-off-me' type assist, especially on wake-up.",
    ],
  },
];

const Assists: NextPage = () => {
  return (
    <>
      <Head>
        <title>Assists / Akuma / Plinker</title>
        <meta property="og:title" content="Akuma - Assists | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:description" content="Frame data and details for Akuma's assists." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
      </Head>
      <Container className="assists-container">
        {assists.map((a) => (
          <MovePreview key={a.type} to="/assist">
            <MovePreviewHeader>
              <Typography color="gray" uppercase variant="subheading1">
                {a.type}
              </Typography>
              <Typography shadow uppercase variant="h2">
                {a.name}
              </Typography>
            </MovePreviewHeader>
            <MovePreviewContent>
              <MovePreviewImage alt="Dr. Doom perform Hidden Missiles" src="/images/moves/akuma-fireball.png" />
              <MovePreviewData>
                <DataRow label="Start Up" value={a.startUp} />
                <DataRow label="Active" value={a.active} />
                <DataRow label="Recovery" value={a.recovery} />
                <DataRow label="Alt. Assist Recovery" value={a.altRecovery} />
                <DataRow label="Damage" value={a.damage} />
                <DataRow label="Meter Gain" value={a.meterGain} />
                <DataRow label="Team Hyper" value={a.thc} />
              </MovePreviewData>
              <MovePreviewExtraInfo attributes={a.attributes} notes={a.notes} />
            </MovePreviewContent>
          </MovePreview>
        ))}
      </Container>
    </>
  );
};

export default Assists;
