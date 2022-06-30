import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { RawCharacter } from "types";

const DB_DIR = path.join(process.cwd(), "db");
const JSON_PATH = path.join(DB_DIR, "index.json");

export function getAllCharactersJSON(): Array<RawCharacter> {
  if (!fs.existsSync(JSON_PATH)) {
    return [];
  }

  return JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
}

export function getCharacterJSON(cid: string): RawCharacter {
  const characters = getAllCharactersJSON();
  const [character] = characters.filter((c) => c.id === cid);
  return character;
}

export function getMetadataFromFile(filename: string) {
  if (!fs.existsSync(filename)) {
    return {};
  }

  const content = fs.readFileSync(filename, "utf-8");
  const result = matter(content);
  const metadata = result.data;
  return { ...metadata };
}

export function getContentFromFile(filename: string) {
  if (!fs.existsSync(filename)) {
    return "";
  }

  const content = fs.readFileSync(filename, "utf-8");
  const result = matter(content);
  return result.content;
}

export function getIdFromFilename(filename: string) {
  return path.basename(filename, ".mdx");
}

export function getCharacterOverviewPath(cid: string) {
  return path.join(DB_DIR, cid, "overview.mdx");
}

export function getCharacterTrialsPath(cid: string) {
  return path.join(DB_DIR, cid, "trials");
}

export function getTrialPath(cid: string, tid: string) {
  return path.join(DB_DIR, cid, "trials", tid + ".mdx");
}

export function getCharacterMovesPath(cid: string) {
  return path.join(DB_DIR, cid, "moves");
}

export function getCharacterAssistsPath(cid: string) {
  return path.join(DB_DIR, cid, "assists");
}

export function getAssistPath(cid: string, aid: string) {
  return path.join(DB_DIR, cid, "assists", aid + ".mdx");
}
