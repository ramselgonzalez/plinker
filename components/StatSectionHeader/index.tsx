import Typography from "components/Typography";

interface StatSectionHeaderProps {
  children: React.ReactNode;
}

function StatSectionHeader(props: StatSectionHeaderProps) {
  const { children } = props;

  if (typeof children === "string") {
    return (
      <div className="flex items-center justify-between border-b border-neutral-400 py-3">
        <Typography variant="h3" className="uppercase">
          {children}
        </Typography>
      </div>
    );
  }

  return <div className="flex items-center justify-between border-b border-neutral-400 py-3">{children}</div>;
}

export default StatSectionHeader;
