import Image from "next/image";
// components
import Chip from "./Chip";
import DataItem from "./DataItem";
import Typography from "./Typography";
// utils
import { getInputColor } from "helpers";
import { IMoveDetail } from "types";

interface MoveOverviewProps {
  blurDataURL: string;
  move: IMoveDetail;
}
function MoveOverview(props: MoveOverviewProps) {
  const { move, blurDataURL } = props;
  return (
    <div className="flex flex-col gap-x-4 md:flex-row">
      <div className="relative mb-2 flex h-auto overflow-hidden rounded-2xl border border-neutral-500 md:mb-0 md:w-1/2">
        <Image
          alt={move.imgAlt}
          blurDataURL={blurDataURL}
          height={480}
          key={move.id}
          objectFit="cover"
          placeholder={blurDataURL ? "blur" : undefined}
          priority
          src={move.imgUrl}
          width={853}
        />
      </div>
      <div className="flex flex-col md:w-1/2">
        <div>
          <Typography className="mb-2 uppercase" color="gray" variant="h4">
            Input
          </Typography>
          <Chip className="h3" color={getInputColor(move.input)}>
            {move.input}
          </Chip>
        </div>
        <div className="mt-3 flex border-y border-neutral-700 py-3">
          <DataItem className="flex-auto border-r" label="Class" value={move.type} />
          <DataItem className="flex-auto border-r" label="Block" value={move.block} />
          <DataItem className="flex-auto" label="Hit Type" value={move.hit} />
        </div>
        <div className="mt-2 flex flex-1 flex-col justify-between gap-y-4">
          <Typography className="italic">{move.description}</Typography>
          {move.attributes.length > 0 && (
            <div>
              <Typography className="uppercase" color="gray" variant="h4">
                Attributes
              </Typography>
              <div className="mt-2 flex flex-wrap gap-2">
                {move.attributes.map((a) => (
                  <Chip className="h4 uppercase" key={a}>
                    {a}
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MoveOverview;
