import { IMovePreview, IMoveDetail, RawMove, MoveType } from "types";
import { getDmgRange, getDmgPreview, getHits } from "helpers";

export function getMovePreview(move: RawMove): IMovePreview {
  return {
    active: move.active || "--",
    advBlock: move.advBlock || "--",
    advHit: move.advHit || "--",
    attributes: move.attributes,
    dmg: getDmgPreview(move.dmg),
    id: move.id,
    input: move.input,
    name: move.name,
    recovery: move.recovery || "--",
    startUp: move.startUp || "--",
    type: move.type,
  };
}

export function getMoveDetail(move: RawMove): IMoveDetail {
  return {
    id: move.id,
    active: move.active || "--",
    attributes: move.attributes,
    block: move.block,
    advBlock: move.advHit || "--",
    advHit: move.advHit || "--",
    description: move.description || "",
    dmg: getDmgRange(move.dmg)[0],
    dmgMax: getDmgRange(move.dmg)[1],
    dmgPerHit: move.dmgPerHit,
    hit: move.hit,
    hits: getHits(move.hits)[0],
    hitsMax: getHits(move.hits)[1],
    imageUrl: "",
    imageAlt: "",
    input: move.input,
    isLevelThree: move.attributes.includes("Level 3 Super"),
    meterGain: move.meterGain,
    name: move.name,
    notes: move.notes,
    recovery: move.recovery || "--",
    startUp: move.startUp || "--",
    type: move.type,
  };
}

export function getPreviousMoveIndex(moveIndex: number, totalMoves: number) {
  return moveIndex - 1 < 0 ? totalMoves - 1 : moveIndex - 1;
}

export function getNextMoveIndex(moveIndex: number, totalMoves: number) {
  return moveIndex + 1 === totalMoves ? 0 : moveIndex + 1;
}

export function getMinDmgScaling(moveType: MoveType, normalFactor: number, specialFactor: number, superFactor: number) {
  const UNSCALED_FACTOR = 1;
  switch (moveType) {
    case "Normal":
      return normalFactor;
    case "Command Normal":
      return normalFactor;
    case "Throw":
      return UNSCALED_FACTOR;
    case "Air Exchange":
      return specialFactor;
    case "Snap Back":
      return normalFactor;
    case "Special":
      return specialFactor;
    case "Super":
      return superFactor;
    default:
      return UNSCALED_FACTOR;
  }
}
