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
