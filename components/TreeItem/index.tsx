import Typography from "components/Typography";
import Link from "next/link";

interface TreeItemProps extends React.ComponentPropsWithoutRef<"li"> {
  to: string;
}

function TreeItem(props: TreeItemProps) {
  const { children, to, ...rest } = props;
  return (
    <li {...rest}>
      <Link href={to}>
        <a>
          <Typography
            color="gray"
            className="mt-1 -ml-1px block border-l border-neutral-500 px-4 hover:border-neutral-50 hover:text-neutral-50 hover:underline"
          >
            {children}
          </Typography>
        </a>
      </Link>
    </li>
  );
}

export default TreeItem;
