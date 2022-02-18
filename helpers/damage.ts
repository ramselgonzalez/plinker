function applyDmgMod(damage: number, scaling: number = 1, xf: number = 0) {
  return damage * scaling * (1 + xf);
}

function getRoundedDmg(damage: number) {
  return Math.floor(damage / 100) * 100;
}

export function getDmgRange(dmg: string | number) {
  if (typeof dmg === "number") {
    return [dmg, null] as const;
  }

  const [dmgMinStr, dmgMaxStr] = dmg.split(" - ");
  const dmgMinNum = parseInt(dmgMinStr);
  const dmgMaxNum = parseInt(dmgMaxStr);
  return [dmgMinNum, dmgMaxNum];
}

export function getScaling(scaling: number, isXfactorActive: boolean, isLevelThree?: boolean) {
  if (isLevelThree) return 1;
  if (isXfactorActive) return 0.35;
  return scaling;
}

export function getDmgPreview(damage: string | number) {
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

export function getDmg(damage: number, multiplier: number) {
  const modifiedDmg = applyDmgMod(damage, 1, multiplier);
  return getRoundedDmg(modifiedDmg).toLocaleString();
}

export function getDmgPerHit(damage: string | number, mulitplier: number) {
  if (typeof damage === "number") {
    return getDmg(damage, mulitplier);
  }

  const hits = damage.split(", ");
  const final = [];
  for (const hit of hits) {
    if (hit.includes("*")) {
      const [dmgStr, repeatStr] = hit.split(" * ");
      const dmg = getDmg(parseInt(dmgStr), mulitplier);
      final.push(dmg + " * " + repeatStr);
    } else {
      final.push(getDmg(parseInt(hit), mulitplier));
    }
  }
  return final.join(", ");
}

export function getScaledSingleHit(damage: number, scaling: number, multiplier: number) {
  const modifiedDamage = applyDmgMod(damage, scaling, multiplier);
  return getRoundedDmg(modifiedDamage).toLocaleString();
}

export function getScaledMultiHit(damage: string | number, hits: number, scaling: number, multiplier: number) {
  if (typeof damage === "number") {
    const modifiedDamage = applyDmgMod(damage, scaling, multiplier);
    return getRoundedDmg(modifiedDamage * hits).toLocaleString();
  }

  const multiHitDamageArray = getMultiHitDamageArray(damage);
  const scaledHits = multiHitDamageArray.map((hit) => {
    const modifiedDamage = applyDmgMod(hit, scaling, multiplier);
    return getRoundedDmg(modifiedDamage);
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
    const modifiedDamage = applyDmgMod(damage, scaling, multiplier);
    return getRoundedDmg(modifiedDamage).toLocaleString();
  }

  const hits = damage.split(", ");
  const final = [];
  for (const hit of hits) {
    if (hit.includes("*")) {
      const [dmgStr, repeatStr] = hit.split(" * ");
      const dmg = parseInt(dmgStr);
      const scaledDmg = applyDmgMod(dmg, scaling, multiplier);
      const rounded = getRoundedDmg(scaledDmg);
      final.push(rounded.toLocaleString() + " * " + repeatStr);
    } else {
      const dmg = parseInt(hit);
      const scaledDmg = applyDmgMod(dmg, scaling, multiplier);
      const rounded = getRoundedDmg(scaledDmg);
      final.push(rounded.toLocaleString());
    }
  }
  return final.join(", ");
}
