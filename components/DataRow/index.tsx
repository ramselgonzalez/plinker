import Typography from "components/Typography";

interface DataRowProps {
  label: string;
  value: string | number;
}

function DataRow(props: DataRowProps) {
  const { label, value } = props;
  return (
    <div className="row">
      <Typography color="gray" component="h4" uppercase variant="subheading1">
        {label}
      </Typography>
      <Typography className="row-value" component="p" shadow uppercase variant="h4">
        {value}
      </Typography>
    </div>
  );
}

export default DataRow;
