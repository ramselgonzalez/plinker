import Typography from "components/Typography";

interface DataItemProps {
  label: string;
  value?: string | number;
}

function DataItem(props: DataItemProps) {
  const { label, value = "--" } = props;
  return (
    <div className="data-item-container">
      <Typography className="data-item-label" color="gray" uppercase variant="subheading1">
        {label}
      </Typography>
      <Typography shadow variant="h2">
        {value}
      </Typography>
    </div>
  );
}

export default DataItem;
