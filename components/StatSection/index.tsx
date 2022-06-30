import cn from "classnames";

interface StatSectionProps extends React.ComponentPropsWithoutRef<"section"> {
  divider?: boolean;
}

function StatSection(props: StatSectionProps) {
  const { children, className } = props;

  return (
    <table
      className={cn("w-full", {
        [`${className}`]: className,
      })}
    >
      {children}
    </table>
  );
}

export default StatSection;
