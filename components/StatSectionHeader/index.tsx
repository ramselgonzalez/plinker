import Typography from "components/Typography";

interface StatSectionHeaderProps {
  children: React.ReactNode;
}

function StatSectionHeader(props: StatSectionHeaderProps) {
  const { children } = props;

  if (typeof children === "string") {
    return (
      <caption className="border-b border-t-3 border-t-neutral-300 border-b-neutral-400 py-3 text-left">
        <Typography variant="h3" component="h2" className="uppercase">
          {children}
        </Typography>
      </caption>
    );
  }

  return <caption className="border-b border-neutral-400 py-3 text-left">{children}</caption>;
}

export default StatSectionHeader;
