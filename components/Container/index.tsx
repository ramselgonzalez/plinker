interface ContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

function Container(props: ContainerProps) {
  const { children, className } = props;
  let classes = "page-container";
  if (className) {
    classes = classes + " " + className;
  }

  return <main className={classes}>{children}</main>;
}

export default Container;
