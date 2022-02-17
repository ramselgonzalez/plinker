import { AirDashArchetype, ICharacterOverview, ICharacterPreview, RawCharacter } from "types";

export function getCharacterPreview(c: RawCharacter): ICharacterPreview {
  return {
    id: c.id,
    archetype: c.archetype,
    difficulty: c.difficulty,
    franchise: c.franchise,
    health: getHealth(c.health),
    name: c.name,
    recommendedPosition: c.recommendedPosition,
    selectOrder: c.selectOrder,
  };
}

export function getCharacterOverview(c: RawCharacter): ICharacterOverview {
  return {
    adf: getDashLabel(c.airDashForwardDuration, c.airDashForwardCancelThreshold),
    addf: getDashLabel(c.airDashDownForwardDuration, c.airDashDownForwardCancelThreshold),
    add: getDashLabel(c.airDashDownDuration, c.airDashDownCancelThreshold),
    addb: getDashLabel(c.airDashDownBackDuration, c.airDashDownBackCancelThreshold),
    adb: getDashLabel(c.airDashBackDuration, c.airDashBackCancelThreshold),
    adub: getDashLabel(c.airDashUpBackDuration, c.airDashUpBackCancelThreshold),
    adu: getDashLabel(c.airDashUpDuration, c.airDashUpCancelThreshold),
    aduf: getDashLabel(c.airDashUpForwardDuration, c.airDashUpForwardCancelThreshold),
    archetype: c.archetype,
    airDashArchetype: getAirDashLabel(c.airDashArchetype),
    chainComboArchetype: c.chainComboArchetype,
    health: getHealth(c.health),
    gdf: getDashLabel(c.groundDashForwardDuration, c.groundDashForwardCancelThreshold),
    gdb: getDashLabel(c.groundDashBackDuration, c.groundDashBackCancelThreshold),
    id: c.id,
    minDmgScalingNormal: getPercentage(c.minDmgScalingNormal),
    minDmgScalingSpecial: getPercentage(c.minDmgScalingSpecial),
    minDmgScalingSuper: getPercentage(c.minDmgScalingSuper),
    name: c.name,
    normalJumpDuration: getJumpDuration(c.normalJumpDuration),
    superJumpDuration: getJumpDuration(c.superJumpDuration),
    doubleJumpDuration: getJumpDuration(c.doubleJumpDuration),
    tripleJumpDuration: getJumpDuration(c.tripleJumpDuration),
    recommendedPosition: c.recommendedPosition,
    xf1: getXfactorLabel(c.xf1SpeedBoost, c.xf1DamageBoost),
    xf2: getXfactorLabel(c.xf2SpeedBoost, c.xf2DamageBoost),
    xf3: getXfactorLabel(c.xf3SpeedBoost, c.xf3DamageBoost),
    crossoverActive: c.crossoverActive,
    crossoverRecovery: c.crossoverRecovery,
    crossoverBlockAdv: c.crossoverBlockAdv,
  };
}

function getRowLabel(left: string | number, right: string | number) {
  return left + " / " + right;
}

function getDashLabel(duration: number | null, threshold: number | null) {
  if (!duration && !threshold) {
    return null;
  }
  return getRowLabel(duration || "--", threshold || "--");
}

function getXfactorLabel(speed: number, damage: number) {
  const speedPct = "+" + getPercentage(speed);
  const damagePct = "+" + getPercentage(damage);
  return getRowLabel(speedPct, damagePct);
}

function getAirDashLabel(airDashArchetype: AirDashArchetype) {
  return airDashArchetype || "None";
}

function getHealth(health: number) {
  return health.toLocaleString();
}

function getJumpDuration(value: number | null) {
  if (!value) return null;
  return value + "f";
}

function getPercentage(value: number) {
  return value.toLocaleString("en", { style: "percent" });
}
