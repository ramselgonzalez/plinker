import React, { useState } from "react";
import cn from "classnames";
type SelectableCharacter = {
  id: string;
  name: string;
};

interface CharacterSelectProps {
  children: (options: {
    selectedCharacter: SelectableCharacter | null;
    onClick: (c: SelectableCharacter) => void;
  }) => React.ReactNode;
  isMobile: boolean;
}
function CharacterSelect(props: CharacterSelectProps) {
  const { children, isMobile } = props;
  const [selectedCharacter, setSelectedCharacter] = useState<SelectableCharacter | null>(null);

  function handleSelectCharacter(character: SelectableCharacter) {
    setSelectedCharacter(character);
  }

  return (
    <div
      className={cn({
        ["character-select-desktop"]: !isMobile,
        ["character-select-mobile"]: isMobile,
      })}
    >
      {children({ selectedCharacter, onClick: handleSelectCharacter })}
    </div>
  );
}

export default CharacterSelect;
