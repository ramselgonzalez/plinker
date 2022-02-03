interface TreeItemProps extends React.ComponentPropsWithoutRef<"li"> {}

function TreeItem(props: TreeItemProps) {
  const { children, id, ...rest } = props;
  return (
    <li {...rest}>
      <a className="tree-item" href={"#" + id}>
        {children}
      </a>
    </li>
  );
}

export default TreeItem;
