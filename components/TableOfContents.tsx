// packages
import cn from "classnames";
// components
import Link from "./Link";
import Typography from "./Typography";

export type TableOfContentsItem = {
  label: string;
  to?: string;
  depth: number;
};

interface TableOfContentsProps {
  onSelectItem?: () => void;
  contents: Array<TableOfContentsItem>;
  isDrawerToc?: boolean;
  label?: string;
}

export default function TableOfContents(props: TableOfContentsProps) {
  const { onSelectItem, contents, isDrawerToc, label } = props;
  return (
    <nav
      className={cn({
        ["sticky top-26 mt-26 hidden max-h-[calc(100vh_-_6.5rem)] w-56 overflow-y-auto py-8 lg:block"]: !isDrawerToc,
        ["-mt-2 px-5 py-4"]: isDrawerToc,
      })}
    >
      {label && <Typography className="block py-1 font-semibold">{label}</Typography>}
      <ul className="border-l border-neutral-500">
        {contents.map((c, i) => (
          <li
            className={cn("mt-1 -ml-1px block border-l border-neutral-500 pr-4", {
              ["hover:border-neutral-50"]: !!c.to,
              ["pl-4"]: c.depth === 0,
              ["pl-8"]: c.depth === 1,
            })}
            key={`item-${c.to}-${i}`}
            onClick={onSelectItem}
          >
            {c.to ? (
              <Link className="hover:text-neutral-50" color="gray" href={c.to}>
                {c.label}
              </Link>
            ) : (
              <Typography className="block font-semibold">{c.label}</Typography>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
