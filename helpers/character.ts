import { Franchise, ICharacterOverview, ICharacterPreview, RawCharacter } from "types";

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
    ...c,
    airDashArchetype: c.airDashArchetype || "None",
    health: getHealth(c.health),
    minDmgScalingNormal: getPercentage(c.minDmgScalingNormal),
    minDmgScalingSpecial: getPercentage(c.minDmgScalingSpecial),
    minDmgScalingSuper: getPercentage(c.minDmgScalingSuper),
    xf1DamageBoost: getPercentage(c.xf1DamageBoost),
    xf2DamageBoost: getPercentage(c.xf2DamageBoost),
    xf3DamageBoost: getPercentage(c.xf3DamageBoost),
    xf1SpeedBoost: getPercentage(c.xf1SpeedBoost),
    xf2SpeedBoost: getPercentage(c.xf2SpeedBoost),
    xf3SpeedBoost: getPercentage(c.xf3SpeedBoost),
    imgUrl: `/images/portraits/thumbnails_${c.id}.webp`,
    imgAlt: `A Portrait of ${c.name}`,
  };
}

export function getHealth(health: number) {
  return health.toLocaleString();
}

export function getPercentage(value: number) {
  return value.toLocaleString("en", { style: "percent", maximumFractionDigits: 1 });
}

export function getCharacterSortByFranchise<T extends Pick<ICharacterOverview, "selectOrder" | "franchise">>(
  characters: Array<T>,
  franchise: Franchise
) {
  const orderSort = characters.slice().sort((a, b) => a.selectOrder - b.selectOrder);
  return orderSort.filter((c) => c.franchise === franchise);
}

export function getCharacterMobileSort<T extends Pick<ICharacterOverview, "name">>(characters: Array<T>) {
  return characters.slice().sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });
}
