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
export type AirDashArchetype = "1-Way" | "2-Way" | "3-Way" | "8-Way" | null;
export type Block = "Low" | "Mid" | "High" | "Unblockable" | "Throw" | "No Hit";
export type ChainComboArchetype = "Hunter Series" | "Marvel Series" | "2-Hit Limited" | "3-Hit Alternating";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Franchise = "marvel" | "capcom";
export type HitType = "Strike" | "Projectile" | "Throw" | "No Hit";
export type MoveType = typeof MoveTypeValues[number];
export type RecommendedPosition = "Point" | "Middle" | "Anchor";

export interface RawCharacter {
  name: string;
  id: string;
  quote: string;
  health: number;
  selectOrder: number;
  franchise: Franchise;
  difficulty: Difficulty;
  recommendedPosition: RecommendedPosition;
  chainComboArchetype: ChainComboArchetype;
  minDmgScalingLight: number;
  minDmgScalingMedium: number;
  minDmgScalingHeavy: number;
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
  doubleJumpCount: number;
  doubleJumpDuration: number | null;
  tripleJumpDuration: number | null;
  jumpNotes: string | null;
  flightDuration: number | null;
  hasAirDash: boolean;
  airDashCount: number;
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
}

export interface RawMove {
  name: string;
  id: string;
  characterId: string;
  damage: string | number;
  startUp: number | string | null;
  active: number | string | null;
  recovery: number | string | null;
  hitAdv: number | null;
  blockAdv: number | null;
  meterGain: number | string;
  totalHits: number | string;
  input: string;
  moveType: MoveType;
  block: Block;
  hitType: HitType;
  attributes: string | null;
  notes: string | null;
}

export interface RawAssist {
  name: string;
  id: string;
  characterId: string;
  damage: string | number;
  startUp: number | string;
  active: number | string | null;
  recovery: number | string;
  altRecovery: number | string;
  meterGain: number | string;
  totalHits: number | string;
  block: Block;
  attributes: string | null;
  notes: string | null;
  hitType: HitType;
  thc: string;
  type: AssistType;
}

type CharacterPreview = Pick<
  RawCharacter,
  "difficulty" | "franchise" | "id" | "name" | "recommendedPosition" | "selectOrder"
>;

export interface ICharacterPreview extends CharacterPreview {
  health: string;
}

export interface ICharacterOverview {
  adf: string | null;
  addf: string | null;
  add: string | null;
  addb: string | null;
  adb: string | null;
  adub: string | null;
  adu: string | null;
  aduf: string | null;
  airDashArchetype: NonNullable<AirDashArchetype> | "None";
  chainComboArchetype: ChainComboArchetype;
  health: string;
  gdf: string | null;
  gdb: string | null;
  id: string;
  minDmgScalingLight: string;
  minDmgScalingMedium: string;
  minDmgScalingHeavy: string;
  minDmgScalingSpecial: string;
  minDmgScalingSuper: string;
  name: string;
  normalJumpDuration: string | null;
  superJumpDuration: string | null;
  doubleJumpDuration: string | null;
  tripleJumpDuration: string | null;
  recommendedPosition: RecommendedPosition;
  xf1: string;
  xf2: string;
  xf3: string;
}

export interface IMovePreview {
  damage: string | number;
  id: string;
  input: string;
  name: string;
  startUp: number | string;
  active: number | string;
  recovery: number | string;
  hitAdv: number | string;
  blockAdv: number | string;
  attributes: Array<string>;
  moveType: MoveType;
}

export interface IAssistPreview {
  altRecovery: number | string;
  attributes: Array<string>;
  active: number | string;
  block: Block;
  damage: number | string;
  id: string;
  meterGain: number | string;
  name: string;
  recovery: number | string;
  startUp: number | string;
  thc: string;
  type: AssistType;
}
