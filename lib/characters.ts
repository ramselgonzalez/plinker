import fs from "fs";
import path from "path";
import { RawCharacter } from "types";
import * as helpers from "helpers";

const dataDir = path.join(process.cwd(), "data");
const json = path.join(process.cwd(), "data", "index.json");

function getFullCharactersJSON(): Array<RawCharacter> {
  return JSON.parse(fs.readFileSync(json, "utf8"));
}

export function getCharacterIds() {
  const file = getFullCharactersJSON();
  const paths = file.map((c) => ({ params: { cid: c.id } }));
  return paths;
}

export function getCharacterPreviews() {
  const file = getFullCharactersJSON();
  const previews = file.map((c) => helpers.getCharacterPreview(c));
  return previews;
}

export function getCharacterOverview(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const overview = helpers.getCharacterOverview(character);
  const contentPath = path.join(dataDir, cid, "overview.mdx");
  let content = "";
  try {
    content = fs.readFileSync(contentPath, "utf8");
  } catch (err) {
    content = "";
  }

  return {
    character: overview,
    content,
  };
}

export function getMoveIds() {
  const file = getFullCharactersJSON();
  const paths = [];
  for (const c of file) {
    for (const m of c.moves) {
      paths.push({ params: { cid: c.id, mid: m.id } });
    }
  }
  return paths;
}

export function getMovePreviews(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const moves = character.moves.map((m) => helpers.getMovePreview(m));
  return {
    cname: character.name,
    moves,
  };
}

export function getMove(cid: string, mid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const previews = character.moves.map((m) => helpers.getMovePreview(m));
  const moveIndex = character.moves.findIndex((m) => m.id === mid);
  const move = helpers.getMoveDetail(character.moves[moveIndex]);
  const totalMoves = character.moves.length;
  const previousMoveIndex = helpers.getPreviousMoveIndex(moveIndex, totalMoves);
  const nextMoveIndex = helpers.getNextMoveIndex(moveIndex, totalMoves);
  const minDmgScaling = helpers.getMinDmgScaling(
    move.type,
    character.minDmgScalingNormal,
    character.minDmgScalingSpecial,
    character.minDmgScalingSuper
  );

  return {
    cname: character.name,
    minDmgScaling: minDmgScaling,
    move: move,
    moves: previews,
    moveIndex: moveIndex,
    nextMove: character.moves[nextMoveIndex],
    previousMove: character.moves[previousMoveIndex],
    totalMoves: totalMoves,
    xf1: character.xf1DamageBoost,
    xf2: character.xf2DamageBoost,
    xf3: character.xf3DamageBoost,
  };
}

export function getAssistPreviews(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const assists = character.assists.map((a) => helpers.getAssistPreview(a));
  return {
    cname: character.name,
    assists,
  };
}

export function getAssistIds() {
  const file = getFullCharactersJSON();
  const paths = [];
  for (const c of file) {
    for (const a of c.assists) {
      paths.push({ params: { cid: c.id, aid: a.id } });
    }
  }
  return paths;
}

export function getAssist(cid: string, aid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const assistIndex = character.assists.findIndex((a) => a.id === aid);
  const assist = helpers.getAssistDetail(character.assists[assistIndex]);
  const assists = character.assists.map((a) => helpers.getAssistPreview(a));
  const totalAssists = 3;
  const previousMoveIndex = helpers.getPreviousMoveIndex(assistIndex, totalAssists);
  const nextMoveIndex = helpers.getNextMoveIndex(assistIndex, totalAssists);

  return {
    cname: character.name,
    assist: assist,
    assists: assists,
    assistIndex: assistIndex,
    minDmgScaling: character.minDmgScalingSpecial,
    nextAssist: character.assists[nextMoveIndex],
    previousAssist: character.assists[previousMoveIndex],
    totalAssists: totalAssists,
    xf1: character.xf1DamageBoost,
    xf2: character.xf2DamageBoost,
    xf3: character.xf3DamageBoost,
  };
}
