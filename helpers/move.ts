import { IMovePreview, IMoveDetail, RawMove, RawCharacter } from "types";
import { getDmgRange, getDmgPreview } from "helpers/damage";
import { getHits } from "helpers";

export function getMovePreview(move: RawMove, character: RawCharacter): IMovePreview {
  return {
    id: move.id,
    active: move.active || "--",
    advBlock: move.advBlock || "--",
    advHit: move.advHit || "--",
    attributes: move.attributes,
    dmg: getDmgPreview(move.dmg),
    imgUrl: getMoveImgUrl(move.id, character.id),
    imgAlt: getMoveImgAlt(move.name, character.name),
    input: move.input,
    name: move.name,
    recovery: move.recovery || "--",
    startUp: move.startUp || "--",
    type: move.type,
  };
}

export function getMoveDetail(move: RawMove, character: RawCharacter): IMoveDetail {
  return {
    id: move.id,
    active: move.active || "--",
    attributes: move.attributes,
    block: move.block,
    advBlock: move.advHit || "--",
    advHit: move.advHit || "--",
    description: move.description || "",
    dmg: getDmgPreview(move.dmg),
    dmgMax: getDmgRange(move.dmg)[1],
    dmgPerHit: move.dmgPerHit,
    hit: move.hit,
    hits: getHits(move.hits)[0],
    hitsMax: getHits(move.hits)[1],
    imgUrl: getMoveImgUrl(move.id, character.id),
    imgAlt: getMoveImgAlt(move.name, character.name),
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

export function getMoveImgUrl(mid: string, cid: string) {
  return `/images/${cid}/moves/${mid}.jpg`;
}

export function getMoveImgAlt(move: string, character: string) {
  return `${character} performing ${move}`;
}
