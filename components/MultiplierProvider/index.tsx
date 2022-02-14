import { useState } from "react";
import { getScaling } from "helpers/move";

type MultiplerState = {
  scaling: number;
  multiplier: number;
  setMultiplier: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface MultiplierProviderProps {
  isLevelThree: boolean;
  scaling: number;
  children: (options: MultiplerState) => React.ReactNode;
}

function MultiplierProvider(props: MultiplierProviderProps) {
  const { children, isLevelThree, scaling } = props;
  const [multiplier, setMultiplier] = useState(0);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value);
    setMultiplier(value);
  }

  return (
    <>
      {children({
        multiplier,
        scaling: getScaling(scaling, !!multiplier, isLevelThree),
        setMultiplier: onChange,
      })}
    </>
  );
}

export default MultiplierProvider;
