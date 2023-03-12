export const MoveTypeValues = [
  "Normal",
  "Command Normal",
  "Air Exchange",
  "Throw",
  "Snap Back",
  "Special",
  "Super",
] as const;
export type Archetype = "Rushdown" | "Zoning" | "Hybrid";
export type AssistType = "Alpha" | "Beta" | "Gamma";
export type AirDashArchetype = "1-Way" | "2-Way" | "3-Way" | "8-Way" | "None" | null;
export type Block = "Low" | "Mid" | "High" | "Unblockable" | "Throw" | "No Hit";
export type ChainComboArchetype = "Hunter Series" | "Marvel Series" | "2-Hit Limited" | "3-Hit Alternating";
export enum Difficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
export enum Franchise {
  Marvel = "marvel",
  Capcom = "capcom",
}
export enum RecommendedPosition {
  Point = "Point",
  Middle = "Middle",
  Anchor = "Anchor",
}
export type HitType = "Strike" | "Projectile" | "Throw" | "No Hit";
export type MoveType = typeof MoveTypeValues[number];

export interface RawCharacter {
  name: string;
  id: string;
  quote: string;
  health: number;
  selectOrder: number;
  franchise: Franchise;
  archetype: string;
  difficulty: Difficulty;
  recommendedPosition: RecommendedPosition;
  chainComboArchetype: ChainComboArchetype;
  minDmgScalingNormal: number;
  minDmgScalingSpecial: number;
  minDmgScalingSuper: number;
  groundDashForwardDuration: number | null;
  groundDashForwardCancelThreshold: number | null;
  groundDashBackDuration: number | null;
  groundDashBackCancelThreshold: number | null;
  groundDashNotes: string | null;
  normalJumpDuration: number;
  superJumpDuration: number;
  hasDoubleJump: boolean;
  doubleJumpDuration: number | null;
  tripleJumpDuration: number | null;
  jumpNotes: string | null;
  flightDuration: number | null;
  hasAirDash: boolean;
  airDashArchetype: AirDashArchetype;
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
  airDashNotes: string | null;
  crossoverActive: number;
  crossoverRecovery: number;
  crossoverBlockAdv: number;
  xf1DamageBoost: number;
  xf2DamageBoost: number;
  xf3DamageBoost: number;
  xf1SpeedBoost: number;
  xf2SpeedBoost: number;
  xf3SpeedBoost: number;
  moves: Array<RawMove>;
  assists: Array<RawAssist>;
  combos: Array<RawCombo>;
}

export interface RawCombo {
  id: string;
  assistId: string;
  damage: number;
  description: string;
  difficulty: string;
  input: string;
  inputHTML: string;
  meterStart: number;
  meterBuild: number;
  meterSpend: number;
  position: string;
  starter: string;
  title: string;
  trial: number;
  videoId: string;
  xfactor: number;
}

export interface RawMove {
  id: string;
  characterId: string;
  active: number | string | null;
  advBlock: number | null;
  advHit: number | null;
  attributes: Array<string>;
  block: Block;
  description: string;
  dmg: number | string;
  dmgPerHit: number | string | null;
  hit: HitType;
  hits: number | string;
  input: string;
  meterGain: number;
  order: number;
  type: MoveType;
  name: string;
  notes: Array<string>;
  recovery: number | string | null;
  startUp: number | string | null;
}

type CharacterPreview = Pick<
  RawCharacter,
  "difficulty" | "franchise" | "id" | "name" | "recommendedPosition" | "selectOrder" | "archetype"
>;

export interface ICharacterPreview extends CharacterPreview {
  health: string;
}

export interface ICharacterOverview {
  name: string;
  id: string;
  imgUrl: string;
  imgAlt: string;
  quote: string;
  health: string;
  selectOrder: number;
  franchise: Franchise;
  archetype: string;
  difficulty: Difficulty;
  recommendedPosition: RecommendedPosition;
  chainComboArchetype: ChainComboArchetype;
  minDmgScalingNormal: string;
  minDmgScalingSpecial: string;
  minDmgScalingSuper: string;
  groundDashForwardDuration: number | null;
  groundDashForwardCancelThreshold: number | null;
  groundDashBackDuration: number | null;
  groundDashBackCancelThreshold: number | null;
  groundDashNotes: string | null;
  normalJumpDuration: number;
  superJumpDuration: number;
  hasDoubleJump: boolean;
  doubleJumpDuration: number | null;
  tripleJumpDuration: number | null;
  jumpNotes: string | null;
  flightDuration: number | null;
  hasAirDash: boolean;
  airDashArchetype: AirDashArchetype;
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
  airDashNotes: string | null;
  crossoverActive: number;
  crossoverRecovery: number;
  crossoverBlockAdv: number;
  xf1DamageBoost: string;
  xf2DamageBoost: string;
  xf3DamageBoost: string;
  xf1SpeedBoost: string;
  xf2SpeedBoost: string;
  xf3SpeedBoost: string;
}

export interface IMovePreview {
  id: string;
  attributes: Array<string>;
  advBlock: number | string;
  advHit: number | string;
  dmg: string | number;
  imgUrl: string;
  imgAlt: string;
  input: string;
  name: string;
  startUp: number | string;
  active: number | string;
  recovery: number | string;
  type: MoveType;
}

export interface IMoveDetail {
  id: string;
  active: number | string;
  advBlock: number | string;
  advHit: number | string;
  block: Block;
  description: string;
  dmg: string;
  dmgMax: number | null;
  dmgPerHit: string | number | null;
  hit: HitType;
  hits: number;
  hitsMax: number | null;
  imgUrl: string;
  imgAlt: string;
  input: string;
  isLevelThree: boolean;
  meterGain: number;
  name: string;
  recovery: number | string;
  startUp: number | string;
  type: MoveType;
  attributes: Array<string>;
  notes: Array<string>;
}

export interface RawAssist {
  name: string;
  id: string;
  characterId: string;
  description: string;
  hit: HitType;
  type: AssistType;
  thc: string;
  dmg: number;
  dmgPerHit: string | number | null;
  active: string | number | null;
  recovery: number;
  recoveryAlt: number;
  meterGain: number;
  hits: string | number;
  block: Block;
  startUp: number;
  attributes: Array<string>;
  notes: Array<string>;
}

export interface IAssistPreview {
  id: string;
  active: string | number | null;
  block: Block;
  dmg: string;
  imgAlt: string;
  imgUrl: string;
  meterGain: string;
  name: string;
  recovery: number;
  recoveryAlt: number;
  startUp: number;
  thc: string;
  type: AssistType;
  attributes: Array<string>;
}

export interface IAssistDetail {
  id: string;
  active: number | string;
  block: Block;
  description: string;
  dmg: string;
  dmgPerHit: string | number | null;
  hit: HitType;
  hits: number;
  meterGain: number;
  name: string;
  recovery: number | string;
  recoveryAlt: number;
  startUp: number | string;
  thc: string;
  type: AssistType;
  attributes: Array<string>;
  notes: Array<string>;
}

export interface IMoveLink {
  name: string;
  id: string;
}

export type InputColor = "blue" | "yellow" | "red" | "green" | "purple" | undefined;
