import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Chip from "components/Chip";
import Container from "components/Container";
import DataRow from "components/DataRow";
import List from "components/List";
import ListItem from "components/ListItem";
import DamageProvider from "components/MultiplierProvider";
import RadioButton from "components/RadioButton";
import RadioButtonGroup from "components/RadioButtonGroup";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import { getMoveIds, getMove } from "lib/characters";
import { IMoveDetail, IMoveLink, RawMove } from "types";
import { getDmg, getScaledSingleHit, getScaledMultiHit, getDmgPerHit, getMeterGain, getScaledPerHit } from "helpers";
import routes from "routes";
import BottomNavigation from "components/BottomNavigation";

function getPageTitle(name: string, move: string) {
  return `${name} / ${move} / Plinker`;
}

function getOpenGraphTitle(name: string, move: string) {
  return `${name} | ${move}`;
}

function getOpenGraphImageAlt(name: string, move: string) {
  return `${name} performing ${move}`;
}

function getOpenGraphDescription(name: string, move: string) {
  return `Frame data and details for ${name}'s ${move}.`;
}

function getOpenGraphImage(cid: string, mid: string) {
  return `${process.env.NEXT_PUBLIC_HOST}/images/${cid}/moves/${mid}.jpg`;
}

interface MoveProps {
  cname: string;
  move: IMoveDetail;
  previousMove: RawMove;
  nextMove: RawMove;
  moveIndex: number;
  minDmgScaling: number;
  totalMoves: number;
  xf1: number;
  xf2: number;
  xf3: number;
}

const Move: NextPage<MoveProps> = (props) => {
  const { cname, minDmgScaling, move, nextMove, previousMove, moveIndex, totalMoves, xf1, xf2, xf3 } = props;
  const { query } = useRouter();
  const cid = query.cid as string;
  return (
    <>
      <Head>
        <title>{getPageTitle(cname, "Gohadoken L")}</title>
        <meta property="og:title" content={getOpenGraphTitle(cname, "Gohadoken L")} />
        <meta property="og:description" content={getOpenGraphDescription(cname, move.name)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={getOpenGraphImageAlt(cname, move.name)} />
        <meta property="og:image" content={getOpenGraphImage(cid, move.id)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container className="move-container">
        <nav className="move-nav-container">
          <Link href={routes.move(cid, previousMove.id)}>
            <a className="move-link-container previous-move">
              <Typography className="next-move-heading" color="gray" uppercase variant="subheading1">
                Previous Move
              </Typography>
              <Typography uppercase variant="h4">
                {previousMove.name}
              </Typography>
            </a>
          </Link>
          <Link href={routes.move(cid, nextMove.id)}>
            <a className="move-link-container next-move">
              <Typography className="next-move-heading" color="gray" uppercase variant="subheading1">
                Next Move
              </Typography>
              <Typography uppercase variant="h4">
                {nextMove.name}
              </Typography>
            </a>
          </Link>
        </nav>
        <div className="move-col-1">
          <header className="move-header">
            <Typography className="move-subheader" color="blue" gutter shadow variant="h3">
              {move.input}
            </Typography>
            <Typography className="move-header" shadow uppercase variant="h1">
              {move.name}
            </Typography>
          </header>
          <div className="move-image-container">
            <Image
              alt={`${cname} performing ${move.name}`}
              layout="fill"
              objectFit="cover"
              priority
              src={`/images/${cid}/moves/${move.id}.jpg`}
            />
          </div>
          {move.attributes.length > 0 && (
            <div className="chips">
              {move.attributes.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          )}
          {move.notes.length > 0 && (
            <StatSection className="move-usage-container" divider>
              <StatSectionHeader>Usage &amp; Details</StatSectionHeader>
              <List>
                {move.notes.map((n) => (
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
            <DataRow label="Hits" value={move.hits} />
            {move.hitsMax && <DataRow label="Max Hits" value={move.hitsMax} />}
            <DataRow label="Block" value={move.block} />
            <DataRow label="Hit Type" value={move.hit} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value={move.startUp} />
            <DataRow label="Active" value={move.active} />
            <DataRow label="Recovery" value={move.recovery} />
            <DataRow label="Block Adv." value={move.advBlock} />
            <DataRow label="Hit Adv." value={move.advHit} />
          </StatSection>
          <DamageProvider
            key={move.id}
            dmg={move.dmg}
            dmgMax={move.dmgMax}
            dmgPerHit={move.dmgPerHit}
            hits={move.hits}
            isLevelThree={move.isLevelThree}
            minDmgScaling={minDmgScaling}
          >
            {({ dmg, dmgMax, dmgPerHit, dmgPerHitScaled, dmgScaled, multiplier, setMultiplier }) => (
              <StatSection divider>
                <StatSectionHeader>Damage &amp; Meter Values</StatSectionHeader>
                <DataRow label="Damage" value={dmg} />
                {dmgMax && <DataRow label="Max Damage" value={dmgMax} />}
                {dmgPerHit && <DataRow label="Damage / Hit" value={dmgPerHit} />}
                {dmgScaled && <DataRow label="Scaled Damage" value={dmgScaled} />}
                {dmgPerHitScaled && <DataRow label="Scaled Damage / Hit" value={dmgPerHitScaled} />}
                <DataRow label="Meter Gain" value={getMeterGain(move.meterGain, multiplier)} />
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
        <BottomNavigation
          activeStep={moveIndex + 1}
          totalSteps={totalMoves}
          next={routes.move(cid, nextMove.id)}
          back={routes.move(cid, previousMove.id)}
        />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getMoveIds();
  return { paths, fallback: false };
};

interface IParams extends ParsedUrlQuery {
  cid: string;
  mid: string;
}

export const getStaticProps: GetStaticProps<MoveProps> = (context) => {
  const { cid, mid } = context.params as IParams;
  const data = getMove(cid, mid);

  return {
    props: { ...data },
  };
};

export default Move;
