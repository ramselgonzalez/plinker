import cx from "classnames";
import Image from "next/image";

interface CharacterSelectItemProps extends React.ComponentPropsWithoutRef<"button"> {
  alt: string;
  imageUrl: string;
  selected?: boolean;
  variant: "marvel" | "capcom";
}

function CharacterSelectItem(props: CharacterSelectItemProps) {
  const { alt, imageUrl, onClick, selected, variant, ...rest } = props;
  return (
    <button
      className={cx("character-select-item", {
        ["selected-character"]: selected,
        [`${variant}`]: variant,
      })}
      onClick={onClick}
      {...rest}
    >
      <Image alt={alt} className="character-select-image" layout="fill" priority src={imageUrl} />
    </button>
  );
}

export default CharacterSelectItem;
