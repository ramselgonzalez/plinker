import cn from "classnames";
import Typography from "components/Typography";

interface IDataItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  value: React.ReactNode;
  color?: "white" | "gray" | "blue" | "yellow" | "red" | "green" | "purple" | "aqua" | "black";
}

function DataItem(props: IDataItemProps) {
  const { className, color, label, value } = props;
  return (
    <div
      className={cn("flex-auto border-neutral-700 px-4 text-center last:border-r-0", {
        [`${className}`]: className,
      })}
    >
      <Typography className="uppercase" color="gray" variant="h4">
        {label}
      </Typography>
      <Typography className="uppercase" color={color} component="p" variant="h3">
        {value}
      </Typography>
    </div>
  );
}

export default DataItem;
