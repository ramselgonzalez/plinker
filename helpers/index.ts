import { InputColor } from "types";

export function getHits(hits: number | string) {
  if (typeof hits === "number") {
    return [hits, null] as const;
  }

  const [hitsMinStr, hitsMaxStr] = hits.split(" - ");
  const hitsMinNum = parseInt(hitsMinStr);
  const hitsMaxNum = parseInt(hitsMaxStr);
  return [hitsMinNum, hitsMaxNum];
}

export function getInputColor(input: string) {
  let color: InputColor = undefined;
  if (input.includes("L")) {
    color = "blue";
  }

  if (input.includes("M")) {
    color = "yellow";
  }

  if (input.includes("H")) {
    color = "red";
  }

  if (input.includes("S")) {
    color = "green";
  }

  if (input.includes("A1") || input.includes("A2")) {
    color = "purple";
  }

  return color;
}

export * from "./character";
export * from "./move";
export * from "./assist";
export * from "./damage";
