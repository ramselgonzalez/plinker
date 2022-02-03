import cn from "classnames";

interface VariantMappings {
  h1: "h1";
  h2: "h2";
  h3: "h3";
  subheading1: "h6";
  subheading2: "h6";
  body1: "p";
  body2: "p";
}

const variants: VariantMappings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
};

interface TypographyProps extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  component?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  color?: "white" | "gray" | "blue" | "yellow";
  shadow?: boolean;
  uppercase?: boolean;
  variant?: "h1" | "h2" | "h3" | "subheading1" | "subheading2" | "body1" | "body2";
}

function Typography(props: TypographyProps) {
  const { children, className, component, color = "white", shadow, uppercase, variant = "body1", ...rest } = props;

  const Component = component ? component : variants[variant];

  return (
    <Component
      className={cn(className, {
        [`color-${color}`]: color,
        [`text-shadow-${color}`]: shadow,
        [`typography-${variant}`]: variant,
        ["uppercase"]: uppercase,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Typography;
