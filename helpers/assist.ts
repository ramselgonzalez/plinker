import { IAssistPreview, RawAssist } from "types";

export function getAssistPreview(a: RawAssist): IAssistPreview {
  return {
    active: a.active || "--",
    altRecovery: a.altRecovery,
    attributes: a.attributes ? a.attributes.split(",") : [],
    block: a.block,
    damage: a.damage,
    id: a.id,
    meterGain: a.meterGain,
    name: a.name,
    recovery: a.recovery,
    startUp: a.startUp,
    thc: a.thc,
    type: a.type,
  };
}
