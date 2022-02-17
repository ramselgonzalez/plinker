import { useState } from "react";
import { getScaling, getDmg, getDmgPerHit, getScaledPerHit, getScaledMultiHit, getScaledSingleHit } from "helpers";

type MultiplerState = {
  dmg: string;
  dmgMax: string | null;
  dmgPerHit: string | null;
  dmgPerHitScaled: string | null;
  dmgScaled: string | null;
  multiplier: number;
  setMultiplier: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface MultiplierProviderProps {
  dmg: number;
  dmgMax?: number | null;
  dmgPerHit?: string | number | null;
  hits: number;
  isLevelThree?: boolean;
  minDmgScaling: number;
  children: (options: MultiplerState) => React.ReactNode;
}

function DamageProvider(props: MultiplierProviderProps) {
  const { children, dmg, dmgMax, dmgPerHit, hits, isLevelThree, minDmgScaling } = props;
  const [multiplier, setMultiplier] = useState(0);
  const scaling = getScaling(minDmgScaling, !!multiplier, isLevelThree);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value);
    setMultiplier(value);
  }

  const options = {
    dmg: getDmg(dmg, multiplier),
    dmgMax: dmgMax ? getDmg(dmgMax, multiplier) : null,
    dmgPerHit: dmgPerHit ? getDmgPerHit(dmgPerHit, multiplier) : null,
    dmgPerHitScaled: dmgPerHit ? getScaledPerHit(dmgPerHit, scaling, multiplier) : null,
    dmgScaled: dmgPerHit
      ? getScaledMultiHit(dmgPerHit, hits, scaling, multiplier)
      : getScaledSingleHit(dmg, scaling, multiplier),
    multiplier,
    setMultiplier: onChange,
  };

  return <>{children(options)}</>;
}

export default DamageProvider;
