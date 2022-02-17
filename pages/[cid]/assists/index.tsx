import Head from "next/head";
import { useRouter } from "next/router";
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
import { getCharacterIds, getAssistPreviews } from "lib/characters";
import { IAssistPreview } from "types";
import routes from "routes";

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
  cname: string;
  assists: Array<IAssistPreview>;
}

const Assists: NextPage<AssistsProps> = (props) => {
  const { cname, assists } = props;
  const router = useRouter();
  const cid = router.query.cid as string;
  return (
    <>
      <Head>
        <title>{getPageTitle(cname)}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname)} />
        <meta property="og:description" content={getOpenGraphDescription(cname)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
        <meta property="og:image" content={getOpenGraphImage(cname)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container className="assists-container">
        {assists.map((a) => (
          <MovePreview key={a.type} to={routes.assist(cid, a.id)}>
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
            <MovePreviewContent>
              <MovePreviewImage
                alt={`${cname} being called in as an assist performing ${a.name}`}
                src={`/images/${cid}/assists/${a.id}.jpg`}
              />
              <StatSection className="move-preview-data">
                <StatSectionHeader>Frame Data</StatSectionHeader>
                <DataRow label="Start Up" value={a.startUp} />
                <DataRow label="Active" value={a.active || "--"} />
                <DataRow label="Recovery" value={a.recovery} />
                <DataRow label="Alt. Assist Recovery" value={a.recoveryAlt} />
                <DataRow label="Damage" value={a.dmg} />
                <DataRow label="Meter Gain" value={a.meterGain} />
                <DataRow label="Team Hyper" value={a.thc} />
                <DataRow label="Block" value={a.block} />
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

export const getStaticProps: GetStaticProps<AssistsProps> = (context) => {
  const { cid } = context.params as IParams;
  const data = getAssistPreviews(cid);
  return {
    props: {
      cname: data.cname,
      assists: data.assists,
    },
  };
};

export default Assists;
