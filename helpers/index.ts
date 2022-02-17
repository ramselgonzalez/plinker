export function getHits(hits: number | string) {
  if (typeof hits === "number") {
    return [hits, null] as const;
  }

  const [hitsMinStr, hitsMaxStr] = hits.split(" - ");
  const hitsMinNum = parseInt(hitsMinStr);
  const hitsMaxNum = parseInt(hitsMaxStr);
  return [hitsMinNum, hitsMaxNum];
}

export * from "./character";
export * from "./move";
export * from "./assist";
export * from "./damage";
