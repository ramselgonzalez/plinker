import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
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
} from "helpers/move";
import Link from "next/link";

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
  characterId: string;
  characterName: string;
  scaling: number;
  move: IMoveDetail;
  previousMove?: IMoveLink;
  nextMove?: IMoveLink;
}

const Move: NextPage<MoveProps> = (props) => {
  const { characterId, characterName, scaling, move, nextMove, previousMove } = props;
  const {
    name,
    id,
    input,
    attributes,
    notes,
    hits,
    block,
    hitAdv,
    hitType,
    startUp,
    active,
    recovery,
    blockAdv,
    damage,
    maxDamage,
    maxHits,
    damagePerHit,
    meterGain,
    isLevelThree,
  } = move;

  return (
    <>
      <Head>
        <title>{getPageTitle(characterName, "Gohadoken L")}</title>
        <meta property="og:title" content={getOpenGraphTitle(characterName, "Gohadoken L")} />
        <meta property="og:description" content={getOpenGraphDescription(characterName, name)} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content={getOpenGraphImageAlt(characterName, name)} />
        <meta property="og:image" content={getOpenGraphImage(characterId, id)} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Container className="move-container">
        <aside className="move-nav-container">
          <nav className="move-nav">
            {previousMove && (
              <Link href={`/${characterId}/${previousMove.id}`}>
                <a className="move-link-container previous-move">
                  <Typography className="next-move-heading" color="gray" uppercase variant="subheading1">
                    Previous Move
                  </Typography>
                  <Typography uppercase variant="h4">
                    {previousMove.name}
                  </Typography>
                </a>
              </Link>
            )}
            {nextMove && (
              <Link href={`/${characterId}/${nextMove.id}`}>
                <a className="move-link-container next-move">
                  <Typography className="next-move-heading" color="gray" uppercase variant="subheading1">
                    Next Move
                  </Typography>
                  <Typography uppercase variant="h4">
                    {nextMove.name}
                  </Typography>
                </a>
              </Link>
            )}
          </nav>
        </aside>
        <div className="move-col-1">
          <header className="move-header">
            <Typography className="move-subheader" color="blue" gutter shadow variant="h3">
              {input}
            </Typography>
            <Typography className="move-header" gutter shadow uppercase variant="h1">
              {name}
            </Typography>
          </header>
          <div className="move-image-container">
            <Image
              alt="Akuma performing Gohadoken L"
              layout="fill"
              src={`/images/${characterId}/moves/${move.id}.jpg`}
              objectFit="cover"
            />
          </div>
          {attributes.length > 0 && (
            <div className="chips">
              {attributes.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          )}
          {notes.length > 0 && (
            <StatSection className="move-usage-container">
              <StatSectionHeader>Usage &amp; Details</StatSectionHeader>
              <List>
                {notes.map((n) => (
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
            <DataRow label="Hits" value={hits} />
            {maxHits && <DataRow label="Max Hits" value={maxHits} />}
            <DataRow label="Block" value={block} />
            <DataRow label="Hit Type" value={hitType} />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value={startUp} />
            <DataRow label="Active" value={active} />
            <DataRow label="Recovery" value={recovery} />
            <DataRow label="Block Adv." value={blockAdv} />
            <DataRow label="Hit Adv." value={hitAdv} />
          </StatSection>
          <MultiplierProvider scaling={scaling} isLevelThree={isLevelThree}>
            {({ multiplier, scaling, setMultiplier }) => (
              <StatSection divider>
                <StatSectionHeader>Damage &amp; Meter Values</StatSectionHeader>
                <DataRow label="Damage" value={getDamage(damage, multiplier)} />
                {maxDamage && <DataRow label="Max Damage" value={getDamage(maxDamage, multiplier)} />}
                {damagePerHit && <DataRow label="Damage Per Hit" value={getDamagePerHit(damagePerHit, multiplier)} />}
                <DataRow
                  label="Scaled Damage"
                  value={
                    damagePerHit
                      ? getScaledMultiHit(damagePerHit, hits, scaling, multiplier)
                      : getScaledSingleHit(damage, scaling, multiplier)
                  }
                />
                {damagePerHit && (
                  <DataRow label="Scaled Damage Per Hit" value={getScaledPerHit(damagePerHit, scaling, multiplier)} />
                )}
                <DataRow label="Meter Gain" value={getMeterGain(meterGain, multiplier)} />
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
  const { move, nextMove, previousMove } = getMove(cid, mid);
  const character = getCharacterDamageScalingFactors(cid);
  const name = getCharacterName(cid);

  const scalingMap = {
    Normal: character.minDmgScalingLight,
    "Command Normal": character.minDmgScalingLight,
    Throw: 1,
    "Snap Back": character.minDmgScalingLight,
    "Air Exchange": character.minDmgScalingSpecial,
    Special: character.minDmgScalingSpecial,
    Super: character.minDmgScalingSuper,
  };

  return {
    props: {
      characterId: cid,
      characterName: name,
      scaling: scalingMap[move.moveType],
      move,
      nextMove,
      previousMove,
    },
  };
};

export default Move;
