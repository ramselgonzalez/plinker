import cn from "classnames";

interface StatSectionProps extends React.ComponentPropsWithoutRef<"section"> {
  divider?: boolean;
}

function StatSection(props: StatSectionProps) {
  const { children, divider, className } = props;

  return (
    <section
      className={cn("stat-section-container", {
        [`${className}`]: className,
        ["stat-section-divider"]: divider,
      })}
    >
      {children}
    </section>
  );
}

export default StatSection;
