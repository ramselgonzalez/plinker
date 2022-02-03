import React, { useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

type SelectableCharacter = {
  id: string;
  name: string;
};

interface CharacterSelectProps {
  children: React.ReactNode;
  className?: string;
}
function CharacterSelect(props: CharacterSelectProps) {
  const { children: childrenProp, className } = props;
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<SelectableCharacter | null>(null);

  function handleSelectCharacter(character: SelectableCharacter) {
    if (character.id === selectedCharacter?.id) {
      router.push("/overview");
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
