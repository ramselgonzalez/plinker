import { getAssistPreview, getAssistDetail } from "helpers/assist";
import { getCharacterJSON, getAllCharactersJSON, getContentFromFile, getAssistPath } from "helpers/db";

export function getAssistPreviews(cid: string) {
  const character = getCharacterJSON(cid);
  const assists = character.assists.map(getAssistPreview);
  return {
    cname: character.name,
    assists,
  };
}

export function getAssistIds() {
  const file = getAllCharactersJSON();
  const paths = [];
  for (const c of file) {
    for (const a of c.assists) {
      paths.push({ params: { cid: c.id, aid: a.id } });
    }
  }
  return paths;
}

export function getAssist(cid: string, aid: string) {
  const file = getAllCharactersJSON();
  const [character] = file.filter((c) => c.id === cid);
  const [a] = character.assists.filter((a) => a.id === aid);
  const assist = getAssistDetail(a);
  const assists = character.assists.map(getAssistPreview);
  const filename = getAssistPath(cid, aid);
  const content = getContentFromFile(filename);
  return {
    cname: character.name,
    assist: assist,
    assists: assists,
    content,
    minDmgScaling: character.minDmgScalingSpecial,
    xf1: character.xf1DamageBoost,
    xf2: character.xf2DamageBoost,
    xf3: character.xf3DamageBoost,
  };
}
