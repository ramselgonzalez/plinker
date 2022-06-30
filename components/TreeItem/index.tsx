import Link from "components/Link";

interface TreeItemProps extends React.ComponentPropsWithoutRef<"li"> {
  to: string;
}

function TreeItem(props: TreeItemProps) {
  const { children, to, ...rest } = props;
  return (
    <li {...rest}>
      <Link
        href={to}
        className="mt-1 -ml-1px block border-l border-neutral-500 px-4 hover:border-neutral-50 hover:text-neutral-50"
        color="gray"
      >
        {children}
      </Link>
    </li>
  );
}

export default TreeItem;
