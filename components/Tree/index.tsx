interface TreeProps extends React.ComponentPropsWithoutRef<"ul"> {}

function Tree(props: TreeProps) {
  const { children, ...rest } = props;

  return (
    <nav>
      <ul {...rest}>{children}</ul>
    </nav>
  );
}

export default Tree;
