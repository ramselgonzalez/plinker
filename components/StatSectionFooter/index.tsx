import Typography from "components/Typography";

interface StatSectionFooterProps {
  children: React.ReactNode;
}

function StatSectionFooter(props: StatSectionFooterProps) {
  const { children } = props;
  return (
    <div className="flex justify-end py-3">
      <Typography className="uppercase" color="gray" component="p" variant="h4">
        {children}
      </Typography>
    </div>
  );
}

export default StatSectionFooter;
