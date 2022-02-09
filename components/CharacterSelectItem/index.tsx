import cn from "classnames";
import Image from "next/image";
import { ICharacterPreview } from "types";

interface CharacterSelectItemProps {
  alt: string;
  imageUrl: string;
  onSelectCharacter?: (c: ICharacterPreview) => void;
  selected?: boolean;
  variant: "marvel" | "capcom";
  value: ICharacterPreview;
}

function CharacterSelectItem(props: CharacterSelectItemProps) {
  const { alt, imageUrl, onSelectCharacter, selected, value, variant } = props;
  return (
    <button
      className={cn("character-select-item", {
        ["selected-item"]: selected,
        [`${variant}`]: variant,
      })}
      onClick={() => onSelectCharacter?.(value)}
    >
      <Image alt={alt} layout="fill" priority src={imageUrl} />
    </button>
  );
}

export default CharacterSelectItem;
