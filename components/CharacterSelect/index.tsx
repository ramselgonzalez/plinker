import React, { useState } from "react";
import { useRouter } from "next/router";
import { ICharacterPreview } from "types";

interface CharacterSelectProps {
  children: React.ReactNode;
  className?: string;
}
function CharacterSelect(props: CharacterSelectProps) {
  const { children: childrenProp, className } = props;
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<ICharacterPreview | null>(null);

  function handleSelectCharacter(character: ICharacterPreview) {
    if (character.id === selectedCharacter?.id) {
      router.push(`/${character.id}/overview`);
    } else {
      setSelectedCharacter(character);
    }
  }

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return React.cloneElement(child, { onSelectCharacter: handleSelectCharacter, selectedCharacter });
  });

  return <div className={className}>{children}</div>;
}

export default CharacterSelect;
