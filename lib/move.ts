import { getAllCharactersJSON, getCharacterJSON } from "helpers/db";
import { getMovePreview, getMoveDetail } from "helpers/move";
import { getMinDmgScaling } from "helpers/move";

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
  const moves = character.moves.map(getMovePreview);
  return {
    character,
    moves,
  };
}

export function getMove(cid: string, mid: string) {
  const character = getCharacterJSON(cid);
  const previews = character.moves.map(getMovePreview);
  const [m] = character.moves.filter((m) => m.id === mid);
  const move = getMoveDetail(m);
  const minDmgScaling = getMinDmgScaling(
    move.type,
    character.minDmgScalingNormal,
    character.minDmgScalingSpecial,
    character.minDmgScalingSuper
  );
  return {
    character,
    minDmgScaling: minDmgScaling,
    move: move,
    moves: previews,
    xf1: character.xf1DamageBoost,
    xf2: character.xf2DamageBoost,
    xf3: character.xf3DamageBoost,
  };
}
