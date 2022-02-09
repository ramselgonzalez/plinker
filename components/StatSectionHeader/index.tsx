import Typography from "components/Typography";

interface StatSectionHeaderProps {
  children: React.ReactNode;
}

function StatSectionHeader(props: StatSectionHeaderProps) {
  const { children } = props;

  if (typeof children === "string") {
    return (
      <div className="stat-section-header">
        <Typography color="blue" variant="h4" className="uppercase text-shadow-blue">
          {children}
        </Typography>
      </div>
    );
  }

  return <div className="stat-section-header">{children}</div>;
}

export default StatSectionHeader;
