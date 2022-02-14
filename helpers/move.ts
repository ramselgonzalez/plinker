import { IMovePreview, IMoveDetail, RawMove } from "types";
import { getArrayFromString } from "helpers";

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

function applyDamageModifiers(damage: number, scaling: number = 1, xf: number = 0) {
  return damage * scaling * (1 + xf);
}

function getRoundedDamageValue(damage: number) {
  return Math.floor(damage / 100) * 100;
}

export function getScaling(scaling: number, isXfactorActive: boolean, isLevelThree?: boolean) {
  if (isLevelThree) return 1;
  if (isXfactorActive) return 0.35;
  return scaling;
}

export function getDamagePreview(damage: string | number) {
  if (typeof damage === "number") {
    return damage.toLocaleString();
  }

  const [minStr, maxStr] = damage.split(" - ");
  const minDmg = parseInt(minStr).toLocaleString();
  const maxDmg = parseInt(maxStr).toLocaleString();
  return minDmg + " - " + maxDmg;
}

export function getMeterGain(meterGain: number, mulitplier: number) {
  const raw = meterGain * (1 + mulitplier);
  const rounded = Math.floor(raw);
  return rounded.toLocaleString();
}

export function getDamage(damage: number, multiplier: number) {
  const modifiedDmg = applyDamageModifiers(damage, 1, multiplier);
  return getRoundedDamageValue(modifiedDmg).toLocaleString();
}

export function getDamagePerHit(damage: string | number, mulitplier: number) {
  if (typeof damage === "number") {
    return getDamage(damage, mulitplier);
  }

  const hits = damage.split(", ");
  const final = [];
  for (const hit of hits) {
    if (hit.includes("*")) {
      const [dmgStr, repeatStr] = hit.split(" * ");
      const dmg = getDamage(parseInt(dmgStr), mulitplier);
      final.push(dmg + " * " + repeatStr);
    } else {
      final.push(getDamage(parseInt(hit), mulitplier));
    }
  }
  return final.join(", ");
}

export function getScaledSingleHit(damage: number, scaling: number, multiplier: number) {
  const modifiedDamage = applyDamageModifiers(damage, scaling, multiplier);
  return getRoundedDamageValue(modifiedDamage).toLocaleString();
}

export function getScaledMultiHit(damage: string | number, hits: number, scaling: number, multiplier: number) {
  if (typeof damage === "number") {
    const modifiedDamage = applyDamageModifiers(damage, scaling, multiplier);
    return getRoundedDamageValue(modifiedDamage * hits).toLocaleString();
  }

  const multiHitDamageArray = getMultiHitDamageArray(damage);
  const scaledHits = multiHitDamageArray.map((hit) => {
    const modifiedDamage = applyDamageModifiers(hit, scaling, multiplier);
    return getRoundedDamageValue(modifiedDamage);
  });

  return scaledHits.reduce((totalDmg, currentHit) => totalDmg + currentHit, 0).toLocaleString();
}

export function getMultiHitDamageArray(hits: string) {
  const damageArray = [];
  const damageStrings = hits.split(", ");
  for (const string of damageStrings) {
    if (string.includes("*")) {
      const [damageStr, repeatsStr] = string.split(" * ");
      const dmg = parseInt(damageStr);
      const repeats = parseInt(repeatsStr);
      for (let i = 0; i < repeats; i++) {
        damageArray.push(dmg);
      }
    } else {
      const dmg = parseInt(string);
      damageArray.push(dmg);
    }
  }
  return damageArray;
}

export function getScaledPerHit(damage: string | number, scaling: number, multiplier: number) {
  if (typeof damage === "number") {
    const modifiedDamage = applyDamageModifiers(damage, scaling, multiplier);
    return getRoundedDamageValue(modifiedDamage).toLocaleString();
  }

  const hits = damage.split(", ");
  const final = [];
  for (const hit of hits) {
    if (hit.includes("*")) {
      const [dmgStr, repeatStr] = hit.split(" * ");
      const dmg = parseInt(dmgStr);
      const scaledDmg = applyDamageModifiers(dmg, scaling, multiplier);
      const rounded = getRoundedDamageValue(scaledDmg);
      final.push(rounded.toLocaleString() + " * " + repeatStr);
    } else {
      const dmg = parseInt(hit);
      const scaledDmg = applyDamageModifiers(dmg, scaling, multiplier);
      const rounded = getRoundedDamageValue(scaledDmg);
      final.push(rounded.toLocaleString());
    }
  }
  return final.join(", ");
}
