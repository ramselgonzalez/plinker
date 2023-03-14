import { ComponentPropsWithoutRef } from "react";
import cn from "classnames";
import Image from "next/image";
import Link from "components/Link";

interface CharacterSelectItemProps extends ComponentPropsWithoutRef<"a"> {
  alt: string;
  disabled?: boolean;
  href: string;
  imageUrl: string;
}

function CharacterSelectItem(props: CharacterSelectItemProps) {
  const { alt, imageUrl, href, className, disabled } = props;
  return (
    <Link
      aria-disabled={disabled}
      className={cn("relative h-22 w-22 overflow-hidden rounded-lg border border-neutral-500 bg-white", className, {
        ["duration-200 hover:scale-110 focus:scale-110"]: !disabled,
        ["pointer-events-none grayscale"]: disabled,
      })}
      color="black"
      href={disabled ? "#" : href}
    >
      <Image alt={alt} layout="fill" priority src={imageUrl} />
    </Link>
  );
}

export default CharacterSelectItem;
