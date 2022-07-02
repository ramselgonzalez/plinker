import { getHits } from "helpers";
import { getDmgPreview, getMeterGain } from "helpers/damage";
import { IAssistDetail, IAssistPreview, RawAssist } from "types";

export function getAssistPreview(a: RawAssist): IAssistPreview {
  return {
    id: a.id,
    active: a.active || "--",
    attributes: a.attributes,
    block: a.block,
    dmg: getDmgPreview(a.dmg),
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
