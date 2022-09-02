import Typography from "components/Typography";
import Image from "next/image";
import * as mdx from "@mdx-js/react";
import Link from "components/Link";

function getIdFromChildren(children: React.ReactNode) {
  if (typeof children !== "string") {
    return undefined;
  }

  return children.toLowerCase().replace(/ /g, "-");
}

export const MarkdownComponents: React.ComponentProps<typeof mdx.MDXProvider>["components"] = {
  Typography,
  Image,
  TeamImages: ({ c1, c2, c3 }) => {
    const cid1 = getIdFromChildren(c1);
    const cid2 = getIdFromChildren(c2);
    const cid3 = getIdFromChildren(c3);
    return (
      <div className="mb-2 flex gap-4">
        <div className="relative h-30 w-30 overflow-hidden rounded-2xl border border-neutral-500 shadow-md shadow-black/30">
          <Image
            objectFit="cover"
            alt={`portrait of ${c1}`}
            src={`/images/portraits/thumbnails_${cid1}.webp`}
            layout="fill"
          />
        </div>
        <div className="relative h-30 w-30 overflow-hidden rounded-2xl border border-neutral-500 shadow-md shadow-black/30">
          <Image
            objectFit="cover"
            alt={`portrait of ${c2}`}
            src={`/images/portraits/thumbnails_${cid2}.webp`}
            layout="fill"
          />
        </div>
        <div className="relative h-30 w-30 overflow-hidden rounded-2xl border border-neutral-500 shadow-md shadow-black/30">
          <Image
            objectFit="cover"
            alt={`portrait of ${c3}`}
            src={`/images/portraits/thumbnails_${cid3}.webp`}
            layout="fill"
          />
        </div>
      </div>
    );
  },
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
  ul: ({ children }) => (
    <ul className="mb-4 list-inside list-disc [&_>_li_>_ul]:ml-4 [&_>_li_>_ul]:list-[circle]">{children}</ul>
  ),
  Text: (props) => <Typography component="span" {...props} />,
  Link: (props) => <Link {...props} />,
  InputBlock: ({ children }) => (
    <span className="my-1px inline whitespace-pre-wrap rounded-xl bg-neutral-800 py-[2px] px-2 font-mono text-sm">
      {children}
    </span>
  ),
  InlineInput: ({ text, color }) => (
    <Typography component="span" color={color} className="mx-1 rounded-xl bg-neutral-800 py-1 px-2 font-mono text-sm">
      {text}
    </Typography>
  ),
};
