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

export function getInputColor(input: string): InputColor {
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

export function getTrialDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Very Easy":
      return "bg-green-700";
    case "Easy":
      return "bg-green-800";
    case "Medium":
      return "bg-yellow-700";
    case "Hard":
      return "bg-red-600";
    case "Very Hard":
      return "bg-red-900";
    default:
      return "";
  }
}

export function getAssistTypeColor(type: string) {
  switch (type) {
    case "Alpha":
      return "bg-pink-800";
    case "Beta":
      return "bg-blue-600";
    case "Gamma":
      return "bg-green-700";
    default:
      return "";
  }
}
