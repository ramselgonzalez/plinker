interface StatSectionProps extends React.ComponentPropsWithoutRef<"section"> {}

function StatSection(props: StatSectionProps) {
  const { children, className } = props;
  let classes = "stat-section-container";
  if (className) {
    classes = classes + " " + className;
  }

  return <section className={classes}>{children}</section>;
}

export default StatSection;
