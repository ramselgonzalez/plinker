// packages
import cn from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
// components
import Chip from "./Chip";
import Link from "./Link";
import { AssistPreview } from "./Table";
// utils
import { IAssistPreview } from "types";
import { getAssistTypeColor } from "helpers";

interface AssistCardProps {
  assist: IAssistPreview;
  href: string;
}

function AssistCard(props: AssistCardProps) {
  const { assist, href } = props;
  const { push } = useRouter();

  return (
    <div className="paper group flex cursor-pointer flex-col md:flex-row" id={assist.id} onClick={() => push(href)}>
      <div className="hidden w-1/2 p-6 md:block">
        <AssistPreview assist={assist} href={href} />
      </div>
      <div className="p-4 md:hidden">
        <Link className="mb-1 block uppercase group-hover:underline" color="white" href={href} variant="h3">
          {assist.name}
        </Link>
        <Chip className={cn("h4 uppercase", getAssistTypeColor(assist.type))}>{assist.type}</Chip>
      </div>
      <div className="relative mx-4 mb-4 h-52 overflow-hidden rounded-2xl border-neutral-500 bg-neutral-700 md:mx-0 md:mb-0 md:block md:h-auto md:w-1/2 md:rounded-l-none md:border-l">
        <Image alt={assist.imgAlt} layout="fill" objectFit="cover" src={assist.imgUrl} />
      </div>
    </div>
  );
}

export default AssistCard;
