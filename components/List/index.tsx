import cn from "classnames";
interface ListProps extends React.ComponentPropsWithRef<"ul"> {}

function List(props: ListProps) {
  const { children, className, ...rest } = props;
  return (
    <ul className={cn(className)} {...rest}>
      {children}
    </ul>
  );
}

export default List;
