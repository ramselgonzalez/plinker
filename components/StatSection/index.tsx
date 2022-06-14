import cn from "classnames";

interface StatSectionProps extends React.ComponentPropsWithoutRef<"section"> {
  divider?: boolean;
}

function StatSection(props: StatSectionProps) {
  const { children, divider, className } = props;

  return (
    <section
      className={cn("-mt-3", {
        [`${className}`]: className,
        ["mt-0 border-t-3 border-neutral-300"]: divider,
      })}
    >
      {children}
    </section>
  );
}

export default StatSection;
