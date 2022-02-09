import cn from "classnames";

interface ListItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}

function ListItem(props: ListItemProps) {
  const { children, className, ...rest } = props;

  return (
    <li
      className={cn({
        [`${className}`]: className,
        ["list-item-disc-style"]: typeof children === "string",
      })}
      {...rest}
    >
      {children}
    </li>
  );
}

export default ListItem;
