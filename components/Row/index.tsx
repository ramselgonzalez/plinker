import cn from "classnames";
import Typography from "components/Typography";
import { ComponentPropsWithoutRef } from "react";

interface RowProps extends ComponentPropsWithoutRef<"div"> {
  label: string;
  value: string | number | React.ReactNode;
}

function Row(props: RowProps) {
  const { label, value, className } = props;
  return (
    <div
      className={cn("flex items-center justify-between border-b border-b-neutral-700 py-2 last:border-b-0", {
        [`${className}`]: className,
      })}
    >
      <Typography color="gray" className="uppercase" variant="h4">
        {label}
      </Typography>
      {typeof value === "string" || typeof value === "number" ? (
        <Typography component="p" className="uppercase" variant="h3">
          {value}
        </Typography>
      ) : (
        value
      )}
    </div>
  );
}

export default Row;
