import { getContentFromFile, getAllCharactersJSON, getCharacterJSON, getCharacterOverviewPath } from "helpers/db";
import { getCharacterPreview, getCharacterOverview as getCharacter } from "helpers/character";

export function getCharacterIds() {
  const file = getAllCharactersJSON();
  const paths = file.map((c) => ({ params: { cid: c.id } }));
  return paths;
}

export function getCharacterPreviews() {
  const file = getAllCharactersJSON();
  const previews = file.map(getCharacterPreview);
  return previews;
}

export function getCharacterOverview(cid: string) {
  const c = getCharacterJSON(cid);
  const character = getCharacter(c);
  const contentPath = getCharacterOverviewPath(cid);
  const content = getContentFromFile(contentPath);
  return { character, content };
}
