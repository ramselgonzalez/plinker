import List from "components/List";

interface TreeProps extends React.ComponentPropsWithoutRef<"ul"> {}

function Tree(props: TreeProps) {
  const { children, ...rest } = props;

  return (
    <nav>
      <List {...rest}>{children}</List>
    </nav>
  );
}

export default Tree;
