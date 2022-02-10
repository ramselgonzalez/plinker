import fs from "fs";
import path from "path";
import { Character } from "helpers";
import { RawCharacter } from "types";

const dataPath = path.join(process.cwd(), "data", "index.json");

export function getFullCharactersJSON(): Array<RawCharacter> {
  return JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

export function getCharacterIds() {
  const file = getFullCharactersJSON();
  const ids = file.map((c) => ({ params: { cid: c.id } }));
  return ids;
}

export function getCharacterPreviews() {
  const file = getFullCharactersJSON();
  const previews = file.map((c) => {
    const character = new Character(c);
    return character.getCharacterPreview();
  });

  return previews;
}

export function getCharacterOverview(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const overview = new Character(character).getCharacterOverview();
  return overview;
}

export function getCharacterName(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  return character.name;
}

export function getMovePreviews(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const previews = new Character(character).getMovePreviews();
  return previews;
}

export function getAssistPreviews(cid: string) {
  const file = getFullCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const previews = new Character(character).getAssistPreviews();
  return previews;
}
