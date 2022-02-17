import { ParsedUrlQuery } from "querystring";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Chip from "components/Chip";
import Container from "components/Container";
import DataRow from "components/DataRow";
import ListItem from "components/ListItem";
import DamageProvider from "components/MultiplierProvider";
import RadioButton from "components/RadioButton";
import RadioButtonGroup from "components/RadioButtonGroup";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import List from "components/List";
import { getAssistIds, getAssist } from "lib/characters";
import { IAssistDetail, IMoveLink } from "types";
import { getDmg, getDmgPerHit, getScaledMultiHit, getScaledSingleHit, getScaledPerHit, getMeterGain } from "helpers";
import routes from "routes";

function getPageTitle(name: string, assist: string) {
  return `${name} / ${assist} / Plinker`;
}

function getOpenGraphTitle(name: string, assist: string) {
  return `${name} | ${assist}`;
}

function getOpenGraphImageAlt(name: string, assist: string) {
  return `${name} performing ${assist}`;
}

function getOpenGraphDescription(name: string, assist: string) {
  return `Frame data and details for ${name}'s ${assist} assist.`;
}

function getOpenGraphImage(cid: string, mid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/${cid}/moves/${mid}.jpg`;
}

interface AssistProps {
  cname: string;
  assist: IAssistDetail;
  previousAssist: IMoveLink;
  nextAssist: IMoveLink;
  assistIndex: number;
  minDmgScaling: number;
  xf1: number;
  xf2: number;
  xf3: number;
}

const Assist: NextPage<AssistProps> = (props) => {
  const { assist, cname, minDmgScaling, nextAssist, previousAssist, xf1, xf2, xf3 } = props;
  const router = useRouter();
  const cid = router.query.cid as string;
  return (
    <>
      <Head>
        <title>{getPageTitle(cname, assist.name)}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname, assist.name)} />
        <meta property="og:description" content={getOpenGraphDescription(cname, assist.name)} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={getOpenGraphImageAlt(cname, assist.name)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container className="move-container">
        <nav className="move-nav-container">
          <Link href={routes.assist(cid, previousAssist.id)}>
            <a className="move-link-container previous-move">
              <Typography className="next-move-heading" color="gray" uppercase variant="subheading1">
                Previous Assist
              </Typography>
              <Typography uppercase variant="h4">
                {previousAssist.name}
              </Typography>
            </a>
          </Link>
          <Link href={routes.assist(cid, nextAssist.id)}>
            <a className="move-link-container next-move">
              <Typography className="next-move-heading" color="gray" uppercase variant="subheading1">
                Next Assist
              </Typography>
              <Typography uppercase variant="h4">
                {nextAssist.name}
              </Typography>
            </a>
          </Link>
        </nav>
        <div className="move-col-1">
          <header className="move-header">
            <Typography color="blue" gutter shadow uppercase variant="h3">
              {assist.type}
            </Typography>
            <Typography shadow uppercase variant="h1">
              {assist.name}
            </Typography>
          </header>
          <div className="move-image-container">
            <Image
              alt={`${cname} being called in as an assist performing ${assist.name}`}
              src={`/images/${cid}/assists/${assist.id}.jpg`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          {assist.attributes.length > 0 && (
            <div className="chips">
              {assist.attributes.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          )}
          {assist.notes.length > 0 && (
            <StatSection className="move-usage-container" divider>
              <StatSectionHeader>Usage &amp; Details</StatSectionHeader>
              <List>
                {assist.notes.map((n) => (
                  <ListItem className="typography-body1" key={n}>
                    {n}
                  </ListItem>
                ))}
              </List>
            </StatSection>
          )}
        </div>
        <div>
          <StatSection divider>
            <StatSectionHeader>Basic Info</StatSectionHeader>
            <DataRow label="Total Hits" value={assist.hits} />
            <DataRow label="Block" value={assist.block} />
            <DataRow label="Hit Type" value="Projectile" />
            <DataRow label="Team Hyper" value={assist.thc} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value={assist.startUp} />
            <DataRow label="Active" value={assist.active} />
            <DataRow label="Recovery" value={assist.recovery} />
            <DataRow label="Alt. Assist Recovery" value={assist.recoveryAlt} />
          </StatSection>
          <DamageProvider
            dmg={assist.dmg}
            dmgPerHit={assist.dmgPerHit}
            hits={assist.hits}
            minDmgScaling={minDmgScaling}
          >
            {({ dmg, dmgPerHit, dmgPerHitScaled, dmgScaled, multiplier, setMultiplier }) => (
              <StatSection divider>
                <StatSectionHeader>Damage &amp; Meter Values</StatSectionHeader>
                <DataRow label="Damage" value={dmg} />
                {dmgPerHit && <DataRow label="Damage Per Hit" value={dmgPerHit} />}
                {dmgScaled && <DataRow label="Scaled Damage" value={dmgScaled} />}
                {dmgPerHitScaled && <DataRow label="Scaled Damage Per Hit" value={dmgPerHitScaled} />}
                <DataRow label="Meter Gain" value={getMeterGain(assist.meterGain, multiplier)} />
                <form className="stat-section-multiplier-container">
                  <legend className="stat-section-multiplier-legend">
                    <Typography component="p" uppercase variant="subheading1">
                      Apply X-Factor Multiplier
                    </Typography>
                    <Typography color="blue" component="p" shadow variant="h4">
                      (+{multiplier.toLocaleString("en", { style: "percent", maximumFractionDigits: 1 })})
                    </Typography>
                  </legend>
                  <RadioButtonGroup>
                    <RadioButton label="None" checked={multiplier === 0} onChange={setMultiplier} value={0} />
                    <RadioButton label="Level 1" checked={multiplier === xf1} onChange={setMultiplier} value={xf1} />
                    <RadioButton label="Level 2" checked={multiplier === xf2} onChange={setMultiplier} value={xf2} />
                    <RadioButton label="Level 3" checked={multiplier === xf3} onChange={setMultiplier} value={xf3} />
                  </RadioButtonGroup>
                </form>
              </StatSection>
            )}
          </DamageProvider>
        </div>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAssistIds();
  return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
  aid: string;
}

export const getStaticProps: GetStaticProps<AssistProps> = (context) => {
  const { cid, aid } = context.params as IParams;
  const data = getAssist(cid, aid);

  return {
    props: { ...data },
  };
};

export default Assist;
