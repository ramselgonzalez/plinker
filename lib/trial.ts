import fs from "fs";
import path from "path";
import { getAllCharactersJSON, getTrialPath } from "helpers/db";
import { getIdFromFilename, getCharacterTrialsPath, getMetadataFromFile, getContentFromFile } from "helpers/db";
import { RawCombo } from "types";

export function getTrialIds() {
  const file = getAllCharactersJSON();
  const paths = [];
  for (const c of file) {
    const trialDir = getCharacterTrialsPath(c.id);
    if (fs.existsSync(trialDir)) {
      const trialFilenames = fs.readdirSync(trialDir);
      for (const filename of trialFilenames) {
        const tid = getIdFromFilename(filename);
        paths.push({ params: { cid: c.id, tid } });
      }
    }
  }
  return paths;
}

export function getTrials(cid: string) {
  const file = getAllCharactersJSON();
  const trialsDir = getCharacterTrialsPath(cid);
  const [character] = file.filter((c) => c.id === cid);
  const trials = [];
  if (fs.existsSync(trialsDir)) {
    const trialFilenames = fs.readdirSync(trialsDir);
    for (const filename of trialFilenames) {
      const fullPath = path.join(trialsDir, filename);
      const id = getIdFromFilename(filename);
      const meta = getMetadataFromFile(fullPath) as RawCombo;
      trials.push({ ...meta, id });
    }
  }
  return {
    trials: trials.sort((a, b) => (a.trial > b.trial ? 1 : -1)),
    character,
  };
}

export function getTrial(cid: string, tid: string) {
  const file = getAllCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const trialsDir = getCharacterTrialsPath(cid);
  const filePath = getTrialPath(cid, tid);
  if (fs.existsSync(trialsDir) && fs.existsSync(filePath)) {
    const id = getIdFromFilename(filePath);
    const meta = getMetadataFromFile(filePath) as RawCombo;
    const content = getContentFromFile(filePath);
    const trial = { ...meta, id };
    const trialFilenames = fs.readdirSync(trialsDir);
    const trials = trialFilenames
      .map((filename) => {
        const fullPath = path.join(trialsDir, filename);
        const id = getIdFromFilename(filename);
        const meta = getMetadataFromFile(fullPath) as RawCombo;
        return { ...meta, id };
      })
      .sort((a, b) => (a.trial > b.trial ? 1 : -1));
    return { character, trial, trials, content };
  } else {
    return { trials: [], trial: {}, content: "" };
  }
}
