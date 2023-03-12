// packages
import Image from "next/image";
// components
import * as Tables from "components/Table";
// utils
import { ICharacterOverview } from "types";

interface CharacterInfoBoxProps {
  character: ICharacterOverview;
}

export default function CharacterInfoBox(props: CharacterInfoBoxProps) {
  const { character } = props;
  return (
    <div className="md:float-right md:bg-neutral-900 md:pl-4 md:pb-2">
      <div className="paper mt-4 h-max flex-shrink-0 p-4 md:-mt-2 md:w-[375px]">
        <div className="relative mb-4 h-96 overflow-hidden rounded-2xl border border-neutral-500">
          <Image alt={character.imgAlt} layout="fill" objectFit="cover" src={character.imgUrl} />
        </div>
        <Tables.BasicStats character={character} />
        <Tables.DamageScaling character={character} />
        <Tables.XfactorMultipliers character={character} />
        <Tables.GroundDashes character={character} />
        {character.airDashArchetype !== "None" && <Tables.AirDashes character={character} />}
        <Tables.JumpDurations character={character} />
        <Tables.CrossoverAttack character={character} />
      </div>
    </div>
  );
}
