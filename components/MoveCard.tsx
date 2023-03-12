// packages
import { useRouter } from "next/router";
import Image from "next/image";
// components
import Link from "./Link";
import Chip from "./Chip";
import { MovePreview } from "./Table";
// utils
import { getInputColor } from "helpers";
import { BLUR_DATA_URL } from "helpers/images";
import { IMovePreview } from "types";

interface MoveCardProps {
  href: string;
  move: IMovePreview;
}

export default function MoveCard(props: MoveCardProps) {
  const { href, move } = props;
  const { push } = useRouter();
  return (
    <div className="paper group flex cursor-pointer overflow-hidden" key={move.id} onClick={() => push(href)}>
      <div className="block w-full p-4 md:hidden">
        <div className="relative mb-2 h-38 w-full overflow-hidden rounded-2xl bg-neutral-700">
          <Image
            alt={move.imgAlt}
            blurDataURL={BLUR_DATA_URL}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            src={move.imgUrl}
          />
        </div>
        <Link className="mb-1 block uppercase" color="white" href={href} variant="h3">
          {move.name}
        </Link>
        <Chip className="h4 normal-case" color={getInputColor(move.input)}>
          {move.input}
        </Chip>
      </div>
      <div className="hidden w-1/2 p-6 md:block">
        <MovePreview href={href} move={move} />
      </div>
      <div className="relative hidden w-1/2 overflow-hidden border-l border-l-neutral-500 bg-neutral-700 md:block">
        <Image
          alt={move.imgAlt}
          blurDataURL={BLUR_DATA_URL}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          src={move.imgUrl}
        />
      </div>
    </div>
  );
}
