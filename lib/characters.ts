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
  const move = helpers.getMoveDetail(character.moves[moveIndex]);
  return {
    move,
    previousMove: character.moves[moveIndex - 1] || null,
    nextMove: character.moves[moveIndex + 1] || null,
  };
}
