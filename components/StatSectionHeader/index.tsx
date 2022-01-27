import Typography from "components/Typography";

interface StatSectionHeaderProps {
  children: React.ReactNode;
}

function StatSectionHeader(props: StatSectionHeaderProps) {
  const { children } = props;
  return (
    <Typography color="blue" variant="h3" className="uppercase underline bottom-gutter text-shadow-blue">
      {children}
    </Typography>
  );
}

export default StatSectionHeader;
