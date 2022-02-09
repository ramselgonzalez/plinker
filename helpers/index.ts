import {
  AirDashArchetype,
  ChainComboArchetype,
  Difficulty,
  Franchise,
  ICharacterOverview,
  ICharacterPreview,
  RawCharacter,
  RecommendedPosition,
} from "types";

export class Character {
  airDashNormalJumpThreshold: number | null;
  airDashSuperJumpThreshold: number | null;
  airDashUpDuration: number | null;
  airDashUpCancelThreshold: number | null;
  airDashUpForwardDuration: number | null;
  airDashUpForwardCancelThreshold: number | null;
  airDashForwardDuration: number | null;
  airDashForwardCancelThreshold: number | null;
  airDashDownForwardDuration: number | null;
  airDashDownForwardCancelThreshold: number | null;
  airDashDownDuration: number | null;
  airDashDownCancelThreshold: number | null;
  airDashDownBackDuration: number | null;
  airDashDownBackCancelThreshold: number | null;
  airDashBackDuration: number | null;
  airDashBackCancelThreshold: number | null;
  airDashUpBackDuration: number | null;
  airDashUpBackCancelThreshold: number | null;
  airDashArchetype: AirDashArchetype;
  chainComboArchetype: ChainComboArchetype;
  difficulty: Difficulty;
  franchise: Franchise;
  groundDashForwardDuration: number | null;
  groundDashForwardCancelThreshold: number | null;
  groundDashBackDuration: number | null;
  groundDashBackCancelThreshold: number | null;
  health: number;
  id: string;
  normalJumpDuration: number;
  superJumpDuration: number;
  doubleJumpDuration: number | null;
  tripleJumpDuration: number | null;
  name: string;
  minDmgScalingLight: number;
  minDmgScalingMedium: number;
  minDmgScalingHeavy: number;
  minDmgScalingSpecial: number;
  minDmgScalingSuper: number;
  recommendedPosition: RecommendedPosition;
  selectOrder: number;
  xf1DamageBoost: number;
  xf2DamageBoost: number;
  xf3DamageBoost: number;
  xf1SpeedBoost: number;
  xf2SpeedBoost: number;
  xf3SpeedBoost: number;

  constructor(character: RawCharacter) {
    this.airDashNormalJumpThreshold = character.airDashNormalJumpThreshold;
    this.airDashSuperJumpThreshold = character.airDashSuperJumpThreshold;
    this.airDashUpDuration = character.airDashUpDuration;
    this.airDashUpCancelThreshold = character.airDashUpCancelThreshold;
    this.airDashUpForwardDuration = character.airDashUpForwardDuration;
    this.airDashUpForwardCancelThreshold = character.airDashUpForwardCancelThreshold;
    this.airDashForwardDuration = character.airDashForwardDuration;
    this.airDashForwardCancelThreshold = character.airDashForwardCancelThreshold;
    this.airDashDownForwardDuration = character.airDashDownForwardDuration;
    this.airDashDownForwardCancelThreshold = character.airDashDownForwardCancelThreshold;
    this.airDashDownDuration = character.airDashDownDuration;
    this.airDashDownCancelThreshold = character.airDashDownCancelThreshold;
    this.airDashDownBackDuration = character.airDashDownBackDuration;
    this.airDashDownBackCancelThreshold = character.airDashDownBackCancelThreshold;
    this.airDashBackDuration = character.airDashBackDuration;
    this.airDashBackCancelThreshold = character.airDashBackCancelThreshold;
    this.airDashUpBackDuration = character.airDashUpBackDuration;
    this.airDashUpBackCancelThreshold = character.airDashUpBackCancelThreshold;
    this.airDashArchetype = character.airDashArchetype;
    this.chainComboArchetype = character.chainComboArchetype;
    this.difficulty = character.difficulty;
    this.franchise = character.franchise;
    this.health = character.health;
    this.id = character.id;
    this.minDmgScalingLight = character.minDmgScalingLight;
    this.minDmgScalingMedium = character.minDmgScalingMedium;
    this.minDmgScalingHeavy = character.minDmgScalingHeavy;
    this.minDmgScalingSpecial = character.minDmgScalingSpecial;
    this.minDmgScalingSuper = character.minDmgScalingSuper;
    this.name = character.name;
    this.normalJumpDuration = character.normalJumpDuration;
    this.superJumpDuration = character.superJumpDuration;
    this.doubleJumpDuration = character.doubleJumpDuration;
    this.tripleJumpDuration = character.tripleJumpDuration;
    this.recommendedPosition = character.recommendedPosition;
    this.selectOrder = character.selectOrder;
    this.xf1DamageBoost = character.xf1DamageBoost;
    this.xf2DamageBoost = character.xf2DamageBoost;
    this.xf3DamageBoost = character.xf3DamageBoost;
    this.xf1SpeedBoost = character.xf1SpeedBoost;
    this.xf2SpeedBoost = character.xf2SpeedBoost;
    this.xf3SpeedBoost = character.xf3SpeedBoost;
    this.groundDashForwardDuration = character.groundDashForwardDuration;
    this.groundDashForwardCancelThreshold = character.groundDashForwardCancelThreshold;
    this.groundDashBackDuration = character.groundDashBackDuration;
    this.groundDashBackCancelThreshold = character.groundDashBackCancelThreshold;
  }

  getCharacterPreview(): ICharacterPreview {
    return {
      difficulty: this.difficulty,
      franchise: this.franchise,
      health: this.formatHealth(this.health),
      id: this.id,
      name: this.name,
      recommendedPosition: this.recommendedPosition,
      selectOrder: this.selectOrder,
    };
  }

  getCharacterOverview(): ICharacterOverview {
    return {
      adf: this.assembleDashDescription(this.airDashForwardDuration, this.airDashForwardCancelThreshold),
      addf: this.assembleDashDescription(this.airDashDownForwardDuration, this.airDashDownForwardCancelThreshold),
      add: this.assembleDashDescription(this.airDashDownDuration, this.airDashDownCancelThreshold),
      addb: this.assembleDashDescription(this.airDashDownBackDuration, this.airDashDownBackCancelThreshold),
      adb: this.assembleDashDescription(this.airDashBackDuration, this.airDashBackCancelThreshold),
      adub: this.assembleDashDescription(this.airDashUpBackDuration, this.airDashUpBackCancelThreshold),
      adu: this.assembleDashDescription(this.airDashUpDuration, this.airDashUpCancelThreshold),
      aduf: this.assembleDashDescription(this.airDashUpForwardDuration, this.airDashUpForwardCancelThreshold),
      airDashArchetype: this.formatAirDash(this.airDashArchetype),
      chainComboArchetype: this.chainComboArchetype,
      health: this.formatHealth(this.health),
      gdf: this.assembleDashDescription(this.groundDashForwardDuration, this.groundDashForwardCancelThreshold),
      gdb: this.assembleDashDescription(this.groundDashBackDuration, this.groundDashBackCancelThreshold),
      id: this.id,
      minDmgScalingLight: this.formatPercentage(this.minDmgScalingLight),
      minDmgScalingMedium: this.formatPercentage(this.minDmgScalingMedium),
      minDmgScalingHeavy: this.formatPercentage(this.minDmgScalingHeavy),
      minDmgScalingSpecial: this.formatPercentage(this.minDmgScalingSpecial),
      minDmgScalingSuper: this.formatPercentage(this.minDmgScalingSuper),
      name: this.name,
      normalJumpDuration: this.formatJumpDuration(this.normalJumpDuration),
      superJumpDuration: this.formatJumpDuration(this.superJumpDuration),
      doubleJumpDuration: this.formatJumpDuration(this.doubleJumpDuration),
      tripleJumpDuration: this.formatJumpDuration(this.tripleJumpDuration),
      recommendedPosition: this.recommendedPosition,
      xf1: this.assembleXfactorDescription(this.xf1SpeedBoost, this.xf1DamageBoost),
      xf2: this.assembleXfactorDescription(this.xf2SpeedBoost, this.xf2DamageBoost),
      xf3: this.assembleXfactorDescription(this.xf3SpeedBoost, this.xf3DamageBoost),
    };
  }

  formatJumpDuration(value: number | null) {
    if (!value) {
      return null;
    }

    return value + "f";
  }

  formatHealth(health: number) {
    return health.toLocaleString();
  }

  formatAirDash(airDashArchetype: AirDashArchetype) {
    return airDashArchetype || "None";
  }

  formatPercentage(value: number) {
    return value.toLocaleString("en", { style: "percent" });
  }

  assembleRow(left: string | number, right: string | number) {
    return left + " / " + right;
  }

  assembleDashDescription(duration: number | null, threshold: number | null) {
    if (!duration && !threshold) {
      return null;
    }

    return this.assembleRow(duration || "--", threshold || "--");
  }

  assembleXfactorDescription(speed: number, damage: number) {
    const speedPct = "+" + this.formatPercentage(speed);
    const damagePct = "+" + this.formatPercentage(damage);
    return this.assembleRow(speedPct, damagePct);
  }
}
