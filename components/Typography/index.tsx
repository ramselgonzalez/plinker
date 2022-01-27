import React from "react";

interface VariantMappings {
  h1: "h1";
  h2: "h2";
  h3: "h3";
  h4: "h4";
  subheading1: "h6";
  subheading2: "h6";
  body1: "p";
  body2: "p";
}

const variants: VariantMappings = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  subheading1: "h6",
  subheading2: "h6",
  body1: "p",
  body2: "p",
};

interface TypographyProps extends React.ComponentPropsWithoutRef<"p"> {
  children: React.ReactNode;
  color?: "white" | "gray" | "blue" | "yellow";
  variant?: "h1" | "h2" | "h3" | "h4" | "subheading1" | "subheading2" | "body1" | "body2";
}

function generateClassName(variant: string, color?: string, classes?: string) {
  let className = `typography--variant-${variant}`;
  if (classes) {
    className = className + " " + classes;
  }

  if (color) {
    className = className + " " + `color-${color}`;
  }

  return className;
}

function Typography(props: TypographyProps) {
  const { children, className, color = "white", variant = "body1", ...rest } = props;
  const Component = variants[variant];
  const classes = generateClassName(variant, color, className);
  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
}

export default Typography;
