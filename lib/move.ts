import fs from "fs";
import { getAllCharactersJSON, getCharacterJSON, getContentFromFile, getMovePath } from "helpers/db";
import { getMovePreview, getMoveDetail } from "helpers/move";

export function getMoveIds() {
  const file = getAllCharactersJSON();
  const paths = [];
  for (const c of file) {
    for (const m of c.moves) {
      paths.push({ params: { cid: c.id, mid: m.id } });
    }
  }
  return paths;
}

export function getMovePreviews(cid: string) {
  const character = getCharacterJSON(cid);
  const moves = character.moves.map((m) => getMovePreview(m, character));
  return {
    character,
    moves,
  };
}

export function getMove(cid: string, mid: string) {
  const character = getCharacterJSON(cid);
  const moves = character.moves.map((m) => getMovePreview(m, character));
  const [m] = character.moves.filter((m) => m.id === mid);
  const move = getMoveDetail(m, character);
  const filePath = getMovePath(cid, mid);
  let content = "";
  if (fs.existsSync(filePath)) {
    content = getContentFromFile(filePath);
  }

  return {
    character,
    content,
    move,
    moves,
  };
}
