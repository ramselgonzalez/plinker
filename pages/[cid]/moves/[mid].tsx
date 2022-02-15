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
import MultiplierProvider from "components/MultiplierProvider";
import RadioButton from "components/RadioButton";
import RadioButtonGroup from "components/RadioButtonGroup";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import { getCharacterDamageScalingFactors, getMoveIds, getMove, getCharacterName } from "lib/characters";
import { IMoveDetail } from "types";
import {
  getDamage,
  getScaledSingleHit,
  getScaledMultiHit,
  getDamagePerHit,
  getMeterGain,
  getScaledPerHit,
} from "helpers";
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

interface IMoveLink {
  name: string;
  id: string;
}

interface MoveProps {
  cname: string;
  move: IMoveDetail;
  previousMove: IMoveLink;
  nextMove: IMoveLink;
  moveIndex: number;
  scaling: number;
  totalMoves: number;
  xf1: number;
  xf2: number;
  xf3: number;
}

const Move: NextPage<MoveProps> = (props) => {
  const { cname, scaling, move, nextMove, previousMove, moveIndex, totalMoves, xf1, xf2, xf3 } = props;
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
            {move.maxHits && <DataRow label="Max Hits" value={move.maxHits} />}
            <DataRow label="Block" value={move.block} />
            <DataRow label="Hit Type" value={move.hitType} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value={move.startUp} />
            <DataRow label="Active" value={move.active} />
            <DataRow label="Recovery" value={move.recovery} />
            <DataRow label="Block Adv." value={move.blockAdv} />
            <DataRow label="Hit Adv." value={move.hitAdv} />
          </StatSection>
          <MultiplierProvider scaling={scaling} isLevelThree={move.isLevelThree}>
            {({ multiplier, scaling, setMultiplier }) => (
              <StatSection divider>
                <StatSectionHeader>Damage &amp; Meter Values</StatSectionHeader>
                <DataRow label="Damage" value={getDamage(move.damage, multiplier)} />
                {move.maxDamage && <DataRow label="Max Damage" value={getDamage(move.maxDamage, multiplier)} />}
                {move.damagePerHit && (
                  <DataRow label="Damage Per Hit" value={getDamagePerHit(move.damagePerHit, multiplier)} />
                )}
                <DataRow
                  label="Scaled Damage"
                  value={
                    move.damagePerHit
                      ? getScaledMultiHit(move.damagePerHit, move.hits, scaling, multiplier)
                      : getScaledSingleHit(move.damage, scaling, multiplier)
                  }
                />
                {move.damagePerHit && (
                  <DataRow
                    label="Scaled Damage Per Hit"
                    value={getScaledPerHit(move.damagePerHit, scaling, multiplier)}
                  />
                )}
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
                    <RadioButton
                      label="Level 1"
                      checked={multiplier === 0.325}
                      onChange={setMultiplier}
                      value={0.325}
                    />
                    <RadioButton label="Level 2" checked={multiplier === 0.55} onChange={setMultiplier} value={0.55} />
                    <RadioButton
                      label="Level 3"
                      checked={multiplier === 0.775}
                      onChange={setMultiplier}
                      value={0.775}
                    />
                  </RadioButtonGroup>
                </form>
              </StatSection>
            )}
          </MultiplierProvider>
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

export const getStaticProps: GetStaticProps = (context) => {
  const { cid, mid } = context.params as IParams;
  const data = getMove(cid, mid);

  const scalingMap = {
    Normal: data.minDmgScalingNormal,
    "Command Normal": data.minDmgScalingNormal,
    Throw: 1,
    "Snap Back": data.minDmgScalingNormal,
    "Air Exchange": data.minDmgScalingSpecial,
    Special: data.minDmgScalingSpecial,
    Super: data.minDmgScalingSuper,
  };

  return {
    props: {
      cname: data.cname,
      move: data.move,
      moveIndex: data.moveIndex,
      nextMove: data.nextMove,
      previousMove: data.previousMove,
      scaling: scalingMap[data.move.moveType],
      totalMoves: data.totalMoves,
      xf1: data.xf1,
      xf2: data.xf2,
      xf3: data.xf3,
    },
  };
};

export default Move;
