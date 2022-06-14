import Typography from "components/Typography";
import Link from "next/link";

interface TreeSectionProps {
  to?: string;
  children?: React.ReactNode;
  label: string;
}

function TreeSection(props: TreeSectionProps) {
  const { children, label, to } = props;

  return (
    <li>
      {to ? (
        <Link href={to}>
          <a>
            <Typography
              color="gray"
              className="mt-1 -ml-1px block border-l border-neutral-500 px-4 hover:border-neutral-50 hover:text-neutral-50 hover:underline"
            >
              {label}
            </Typography>
          </a>
        </Link>
      ) : (
        <Typography className="block py-1 font-semibold">{label}</Typography>
      )}
      {children && <ul className="border-l border-neutral-500">{children}</ul>}
    </li>
  );
}

export default TreeSection;
