import cn from "classnames";
import Typography from "components/Typography";

interface ChipProps {
  children: React.ReactNode;
}

function Chip(props: ChipProps) {
  const { children } = props;
  return (
    <div className={cn("chip-container")}>
      <Typography variant="body2">{children}</Typography>
    </div>
  );
}

export default Chip;
