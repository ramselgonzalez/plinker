import NextLink from "next/link";
import cn from "classnames";

export interface LinkProps extends React.ComponentPropsWithoutRef<"a"> {
  color?: "white" | "gray" | "blue" | "yellow" | "red" | "green" | "purple" | "aqua" | "black";
  variant?: string;
}

const colors = {
  white: "text-neutral-50",
  gray: "text-neutral-400",
  blue: "text-blue-500",
  yellow: "",
  red: "text-red-400",
  green: "text-green-500",
  purple: "",
  aqua: "text-cyan-300",
  black: "text-neutral-900",
};

function Link(props: LinkProps) {
  const { children, className, color = "aqua", href = "", variant, ...rest } = props;
  return (
    <NextLink href={href} passHref>
      <a className={cn("hover:underline", variant, colors[color], className)} {...rest}>
        {children}
      </a>
    </NextLink>
  );
}

export default Link;
