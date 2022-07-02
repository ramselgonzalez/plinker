import Typography from "components/Typography";

interface IDataItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  value: React.ReactNode;
  color?: "white" | "gray" | "blue" | "yellow" | "red" | "green" | "purple" | "aqua" | "black";
}

function DataItem(props: IDataItemProps) {
  const { className, color, label, value } = props;
  return (
    <div className={`flex-auto border-r border-neutral-700 px-2 text-center last:border-r-0 ${className}`}>
      <Typography color="gray" className="uppercase" variant="h4">
        {label}
      </Typography>
      <Typography color={color} component="p" className="uppercase" variant="h3">
        {value}
      </Typography>
    </div>
  );
}

export default DataItem;
