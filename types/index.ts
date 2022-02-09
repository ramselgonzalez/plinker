export type AirDashArchetype = "1-Way" | "2-Way" | "3-Way" | "8-Way" | null;
export type ChainComboArchetype = "Hunter Series" | "Marvel Series" | "2-Hit Limited" | "3-Hit Alternating";
export type Difficulty = "Easy" | "Medium" | "Hard";
export type Franchise = "marvel" | "capcom";
export type RecommendedPosition = "Point" | "Middle" | "Anchor";

export interface RawCharacter {
  [key: string]: string | number | boolean | null;
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
