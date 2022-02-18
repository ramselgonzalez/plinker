import cn from "classnames";
import { createStyleString } from "@capsizecss/core";
import fontMetrics from "@capsizecss/metrics/barlow";

export const capsizeStyles = {
  h1: createStyleString("capsize-h1", { fontSize: 48, fontMetrics }),
  h2: createStyleString("capsize-h2", { fontSize: 32, fontMetrics }),
  h3: createStyleString("capsize-h3", { fontSize: 24, fontMetrics }),
  h4: createStyleString("capsize-h4", { fontSize: 18, fontMetrics }),
  subheading1: createStyleString("capsize-subheading1", { fontSize: 13, fontMetrics }),
  body1: createStyleString("capsize-body1", { fontSize: 18, fontMetrics }),
  body2: createStyleString("capsize-body2", { fontSize: 16, fontMetrics }),
};

interface VariantMappings {
  h1: "h1";
  h2: "h2";
  h3: "h3";
  h4: "h4";
  subheading1: "h6";
  body1: "p";
  body2: "p";
}

const variants: VariantMappings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subheading1: "h6",
  body1: "p",
  body2: "p",
};

interface TypographyProps extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  component?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  color?: "white" | "gray" | "blue" | "yellow";
  gutter?: boolean;
  shadow?: boolean;
  uppercase?: boolean;
  variant?: "h1" | "h2" | "h3" | "h4" | "subheading1" | "body1" | "body2";
}

function Typography(props: TypographyProps) {
  const {
    children,
    className,
    component,
    color = "white",
    gutter,
    shadow,
    uppercase,
    variant = "body1",
    ...rest
  } = props;

  const Component = component ? component : variants[variant];

  return (
    <Component
      className={cn({
        ["bottom-gutter"]: gutter,
        [`capsize-${variant}`]: variant,
        [`color-${color}`]: color,
        [`text-shadow-${color}`]: shadow,
        [`typography-${variant}`]: variant,
        ["uppercase"]: uppercase,
        [`${className}`]: className,
      })}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Typography;
