import { IMovePreview, IMoveDetail, RawMove } from "types";
import { getArrayFromString, getDamagePreview } from "helpers";

export function getMovePreview(move: RawMove): IMovePreview {
  return {
    active: move.active || "--",
    attributes: getArrayFromString(move.attributes),
    blockAdv: move.blockAdv || "--",
    damage: getDamagePreview(move.damage),
    hitAdv: move.hitAdv || "--",
    id: move.id,
    input: move.input,
    moveType: move.moveType,
    name: move.name,
    recovery: move.recovery || "--",
    startUp: move.startUp || "--",
  };
}

export function getMoveDetail(move: RawMove): IMoveDetail {
  let dmg;
  let maxDmg;
  if (typeof move.damage === "string") {
    const [minStr, maxStr] = move.damage.split(" - ");
    dmg = parseInt(minStr);
    maxDmg = parseInt(maxStr);
  } else {
    dmg = move.damage;
    maxDmg = null;
  }

  let hits;
  let maxHits;
  if (typeof move.hits === "string") {
    const [minStr, maxStr] = move.hits.split(" - ");
    hits = parseInt(minStr);
    maxHits = parseInt(maxStr);
  } else {
    hits = move.hits;
    maxHits = null;
  }

  const attributes = getArrayFromString(move.attributes);

  return {
    active: move.active || "--",
    attributes,
    block: move.block,
    blockAdv: move.blockAdv || "--",
    damagePerHit: move.damagePerHit,
    damage: dmg,
    hits,
    hitAdv: move.hitAdv || "--",
    hitType: move.hitType,
    id: move.id,
    input: move.input,
    isLevelThree: attributes.includes("Level 3 Super"),
    maxHits,
    maxDamage: maxDmg,
    meterGain: move.meterGain,
    moveType: move.moveType,
    name: move.name,
    notes: getArrayFromString(move.notes),
    recovery: move.recovery || "--",
    startUp: move.startUp || "--",
  };
}
