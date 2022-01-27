import Typography from "components/Typography";

interface DataRowProps {
  label: string;
  value: string | number;
}

function DataRow(props: DataRowProps) {
  const { label, value } = props;
  return (
    <div className="row">
      <Typography className="uppercase" color="gray" variant="subheading1">
        {label}
      </Typography>
      <Typography className="uppercase text-shadow-white" variant="h3">
        {value}
      </Typography>
    </div>
  );
}

export default DataRow;
