import Typography from "components/Typography";

interface DataItemProps {
  label: string;
  value?: string | number;
}

function DataItem(props: DataItemProps) {
  const { label, value = "--" } = props;
  return (
    <div className="flex flex-col items-center justify-center rounded-lg py-3 px-6 text-center">
      <Typography component="p" className="mb-2 uppercase" color="gray" variant="subheading1">
        {label}
      </Typography>
      <Typography component="p" className="uppercase" variant="h4">
        {value}
      </Typography>
    </div>
  );
}

export default DataItem;
