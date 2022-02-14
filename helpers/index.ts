export function getArrayFromString(value: string | null) {
  if (!value) {
    return [];
  }
  return value.split(", ");
}

export * from "./character";
export * from "./move";
export * from "./assist";
