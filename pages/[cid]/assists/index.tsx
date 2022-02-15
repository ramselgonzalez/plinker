import Head from "next/head";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Chip from "components/Chip";
import Container from "components/Container";
import DataRow from "components/DataRow";
import MovePreview from "components/MovePreview";
import MovePreviewContent from "components/MovePreviewContent";
import MovePreviewHeader from "components/MovePreviewHeader";
import MovePreviewImage from "components/MovePreviewImage";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import { getCharacterIds, getCharacterName, getAssistPreviews } from "lib/characters";
import { IAssistPreview } from "types";

function getPageTitle(name: string) {
  return `${name} / Assists / Plinker`;
}

function getOpenGraphTitle(name: string) {
  return `${name} | Assists`;
}

function getOpenGraphDescription(name: string) {
  return `Frame data and details for ${name}'s assists.`;
}

function getOpenGraphImage(cid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/akuma-fireball.png`;
}

interface AssistsProps {
  name: string;
  assists: Array<IAssistPreview>;
}

const Assists: NextPage<AssistsProps> = (props) => {
  const { name, assists } = props;
  return (
    <>
      <Head>
        <title>{getPageTitle(name)}</title>
        <meta property="og:title" content={getOpenGraphTitle(name)} />
        <meta property="og:description" content={getOpenGraphDescription(name)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
        <meta property="og:image" content={getOpenGraphImage(name)} />
      </Head>
      <Container className="assists-container">
        {assists.map((a) => (
          <MovePreview key={a.type} to="/assist">
            <MovePreviewHeader>
              <Typography color="gray" uppercase variant="subheading1">
                {a.type}
              </Typography>
              <Typography className="move-preview-heading" shadow uppercase variant="h2">
                {a.name}
              </Typography>
              {a.attributes.length > 0 && (
                <div className="chips">
                  {a.attributes.map((att) => (
                    <Chip key={att}>{att}</Chip>
                  ))}
                </div>
              )}
            </MovePreviewHeader>
            <MovePreviewContent className="assist-preview-content">
              <MovePreviewImage alt="Dr. Doom perform Hidden Missiles" src="/images/moves/akuma-fireball.png" />
              <StatSection className="move-preview-data">
                <StatSectionHeader>Frame Data</StatSectionHeader>
                <DataRow label="Block" value={a.block} />
                <DataRow label="Start Up" value={a.startUp} />
                <DataRow label="Active" value={a.active} />
                <DataRow label="Recovery" value={a.recovery} />
                <DataRow label="Alt. Assist Recovery" value={a.altRecovery} />
                <DataRow label="Damage" value={a.damage} />
                <DataRow label="Meter Gain" value={a.meterGain} />
                <DataRow label="Team Hyper" value={a.thc} />
              </StatSection>
            </MovePreviewContent>
          </MovePreview>
        ))}
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
  const assists = getAssistPreviews(cid);
  const name = getCharacterName(cid);
  return {
    props: {
      name,
      assists,
    },
  };
};

export default Assists;
