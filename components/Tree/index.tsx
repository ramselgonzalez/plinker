import cn from "classnames";
import Typography from "components/Typography";

interface TreeProps extends React.ComponentPropsWithoutRef<"ul"> {
  label?: string;
}

function Tree(props: TreeProps) {
  const { children, className, label, ...rest } = props;

  return (
    <nav
      aria-label="Table of Contents"
      className={cn("sticky top-26 mt-26 hidden max-h-[calc(100vh_-_6.5rem)] w-56 overflow-y-auto py-8 lg:block", {
        [`${className}`]: className,
      })}
    >
      {label && (
        <Typography component="span" className="uppercase" variant="h4">
          {label}
        </Typography>
      )}
      <ul {...rest}>{children}</ul>
    </nav>
  );
}

export default Tree;
