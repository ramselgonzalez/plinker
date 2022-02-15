import fs from "fs";
import path from "path";
import { RawCharacter } from "types";
import * as helpers from "helpers";

const dataPath = path.join(process.cwd(), "data", "index.json");

export function getFullCharactersJSON(): Array<RawCharacter> {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

export function getCharacterIds() {
  const file = getFullCharactersJSON();
  const paths = file.map((c) => ({ params: { cid: c.id } }));
  return paths;
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

export function getCharacterPreviews() {
  const file = getFullCharactersJSON();
  const previews = file.map((c) => helpers.getCharacterPreview(c));
  return previews;
}

export function getCharacterOverview(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const overview = helpers.getCharacterOverview(character);
  return overview;
}

export function getCharacterName(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  return character.name;
}

export function getCharacterDamageScalingFactors(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const { minDmgScalingLight, minDmgScalingSpecial, minDmgScalingSuper } = character;
  return {
    minDmgScalingLight,
    minDmgScalingSpecial,
    minDmgScalingSuper,
  };
}

export function getMovePreviews(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const previews = character.moves.map((m) => helpers.getMovePreview(m));
  return previews;
}

export function getAssistPreviews(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const previews = character.assists.map((a) => helpers.getAssistPreview(a));
  return previews;
}

export function getMove(cid: string, mid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const moveIndex = character.moves.findIndex((m) => m.id === mid);
  const formattedMove = helpers.getMoveDetail(character.moves[moveIndex]);

  const previousMoveIndex = moveIndex - 1 < 0 ? character.moves.length - 1 : moveIndex - 1;
  const nextMoveIndex = moveIndex + 1 === character.moves.length ? 0 : moveIndex + 1;

  return {
    cname: character.name,
    minDmgScalingNormal: character.minDmgScalingLight,
    minDmgScalingSpecial: character.minDmgScalingSpecial,
    minDmgScalingSuper: character.minDmgScalingSuper,
    move: formattedMove,
    moveIndex: moveIndex,
    nextMove: character.moves[nextMoveIndex],
    previousMove: character.moves[previousMoveIndex],
    totalMoves: character.moves.length,
    xf1: character.xf1DamageBoost,
    xf2: character.xf2DamageBoost,
    xf3: character.xf3DamageBoost,
  };
}
