import { getHits } from "helpers";
import { getDmgPreview, getMeterGain } from "helpers/damage";
import { IAssistDetail, IAssistPreview, RawAssist, RawCharacter } from "types";

function getAssistImgAlt(cname: string, aname: string) {
  return `${cname} being called in as an assist performing ${aname}`;
}

function getAssistImgUrl(cid: string, aid: string) {
  return `/images/${cid}/assists/${aid}.jpg`;
}

export function getAssistPreview(a: RawAssist, character: RawCharacter): IAssistPreview {
  return {
    id: a.id,
    active: a.active || "--",
    attributes: a.attributes,
    block: a.block,
    dmg: getDmgPreview(a.dmg),
    imgAlt: getAssistImgAlt(character.name, a.name),
    imgUrl: getAssistImgUrl(character.id, a.id),
    meterGain: getMeterGain(a.meterGain, 0),
    name: a.name,
    recovery: a.recovery,
    recoveryAlt: a.recoveryAlt,
    startUp: a.startUp,
    thc: a.thc,
    type: a.type,
  };
}

export function getAssistDetail(a: RawAssist): IAssistDetail {
  return {
    active: a.active || "--",
    attributes: a.attributes,
    block: a.block,
    description: a.description || "",
    dmg: getDmgPreview(a.dmg),
    dmgPerHit: a.dmgPerHit || null,
    hit: a.hit,
    hits: getHits(a.hits)[0],
    id: a.id,
    meterGain: a.meterGain,
    name: a.name,
    notes: a.notes,
    recovery: a.recovery,
    recoveryAlt: a.recoveryAlt,
    startUp: a.startUp,
    thc: a.thc,
    type: a.type,
  };
}
