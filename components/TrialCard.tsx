// packages
import { useRouter } from "next/router";
// components
import Typography from "./Typography";
import Chip from "./Chip";
import Link from "./Link";
// utils
import { getTrialDifficultyColor } from "helpers";
import { RawCombo } from "types";

interface TrialCardProps {
  trial: RawCombo;
  href: string;
}

export default function TrialCard(props: TrialCardProps) {
  const { trial, href } = props;
  const { push } = useRouter();

  return (
    <div className="paper group cursor-pointer p-6" onClick={() => push(href)}>
      <div className="flex items-center gap-x-2">
        <div className="avatar">{trial.trial}</div>
        <div className="w-full">
          <Link className="uppercase group-hover:underline" color="white" href={href} variant="h3">
            {trial.title}
          </Link>
        </div>
      </div>
      <div>
        <Typography className="border-b border-neutral-500 pb-2">{trial.description}</Typography>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip className={getTrialDifficultyColor(trial.difficulty)}>
            <Typography className="uppercase" component="span" variant="h4">
              {trial.difficulty}
            </Typography>
          </Chip>
          <Chip>
            <Typography className="uppercase" component="span" variant="h4">
              {trial.position}
            </Typography>
          </Chip>
          <Chip>
            <Typography className="uppercase" component="span" variant="h4">
              {trial.starter}
            </Typography>
          </Chip>
          <Chip>
            <Typography className="uppercase" component="span" variant="h4">
              {trial.assistId ? "Assited" : "Solo"}
            </Typography>
          </Chip>
        </div>
      </div>
    </div>
  );
}
