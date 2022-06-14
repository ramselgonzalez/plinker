import cn from "classnames";

interface VariantMappings {
  h1: "h1";
  h2: "h2";
  h3: "h3";
  h4: "h4";
  subheading1: "h6";
  body1: "p";
  body2: "p";
  default: "p";
}

const variants: VariantMappings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subheading1: "h6",
  body1: "p",
  body2: "p",
  default: "p",
};

const colors = {
  white: "text-neutral-50",
  gray: "text-neutral-400",
  blue: "",
  yellow: "",
  red: "text-red-400",
  green: "text-green-500",
  purple: "",
  aqua: "text-cyan-300",
  black: "text-neutral-900",
};

interface TypographyProps extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  component?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  color?: "white" | "gray" | "blue" | "yellow" | "red" | "green" | "purple" | "aqua" | "black";
  variant?: "h1" | "h2" | "h3" | "h4" | "subheading1" | "body1" | "body2" | "default";
}

function Typography(props: TypographyProps) {
  const { children, className, component, color = "white", variant = "default", ...rest } = props;

  const Component = component ? component : variants[variant];

  return (
    <Component
      className={cn({
        [colors[color]]: color,
        [`${className}`]: className,
        [`${variant}`]: variant,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Typography;
