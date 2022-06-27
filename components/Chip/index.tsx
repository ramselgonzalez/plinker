import cn from "classnames";
import { ComponentPropsWithoutRef } from "react";
import { InputColor } from "types";

interface ChipProps extends ComponentPropsWithoutRef<"div"> {
  color?: InputColor;
  children: React.ReactNode;
}

const colors = {
  white: "bg-neutral-50",
  gray: "bg-neutral-700",
  blue: "bg-blue-600",
  yellow: "bg-yellow-700",
  red: "bg-red-800",
  green: "bg-green-600",
  purple: "bg-purple-700",
  aqua: "bg-cyan-300",
  black: "bg-neutral-900",
};

function Chip(props: ChipProps) {
  const { children, color = "gray", className } = props;
  return (
    <div
      className={cn("inline-flex items-center justify-center rounded-full py-1 px-4", {
        [`${className}`]: className,
        [colors[color]]: color,
      })}
    >
      {children}
    </div>
  );
}

export default Chip;
