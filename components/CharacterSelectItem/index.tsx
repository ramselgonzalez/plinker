import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import routes from "routes";
import { ICharacterPreview } from "types";

interface CharacterSelectItemProps extends ComponentPropsWithoutRef<"a"> {
  alt: string;
  imageUrl: string;
  value: ICharacterPreview;
}

function CharacterSelectItem(props: CharacterSelectItemProps) {
  const { alt, imageUrl, value, className } = props;
  return (
    <Link href={routes.overview(value.id)}>
      <a
        className={cn(
          "relative h-22 w-22 overflow-hidden rounded-lg border border-neutral-500 bg-white duration-200 hover:scale-110",
          {
            [`${className}`]: className,
          }
        )}
      >
        <Image alt={alt} layout="fill" priority src={imageUrl} />
      </a>
    </Link>
  );
}

export default CharacterSelectItem;
