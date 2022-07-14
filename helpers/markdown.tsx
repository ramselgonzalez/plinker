import Typography from "components/Typography";
import * as mdx from "@mdx-js/react";

function getIdFromChildren(children: React.ReactNode) {
  if (typeof children !== "string") {
    return undefined;
  }

  return children.toLowerCase().replace(/ /g, "-");
}

export const MarkdownComponents: React.ComponentProps<typeof mdx.MDXProvider>["components"] = {
  Typography,
  a: ({ children, href }) => (
    <a className="text-cyan-300 hover:underline" href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  ),
  p: ({ children }) => <Typography className="mb-4">{children}</Typography>,
  h2: ({ children }) => (
    <Typography
      className="mt-8 mb-2 scroll-mt-28 border-b border-neutral-500 pb-2 uppercase first-of-type:mt-4"
      id={getIdFromChildren(children)}
      variant="h2"
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography className="uppercase" variant="h3">
      {children}
    </Typography>
  ),
  h4: ({ children }) => (
    <Typography className="mb-4 uppercase" variant="h4">
      {children}
    </Typography>
  ),
  ul: ({ children }) => <ul className="mb-4 list-inside list-disc">{children}</ul>,
};
