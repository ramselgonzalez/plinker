import ListItem from "components/ListItem";

interface TreeItemProps extends React.ComponentPropsWithoutRef<"li"> {}

function TreeItem(props: TreeItemProps) {
  const { children, id, ...rest } = props;
  return (
    <ListItem {...rest}>
      <a className="tree-item" href={`#${id}`}>
        {children}
      </a>
    </ListItem>
  );
}

export default TreeItem;
