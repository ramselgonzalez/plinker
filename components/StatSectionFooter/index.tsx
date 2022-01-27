import Typography from "components/Typography";

interface StatSectionFooterProps {
  children: React.ReactNode;
}

function StatSectionFooter(props: StatSectionFooterProps) {
  const { children } = props;
  return (
    <div className="stat-section-footer">
      <Typography className="uppercase" color="gray" variant="subheading1">
        {children}
      </Typography>
    </div>
  );
}

export default StatSectionFooter;
