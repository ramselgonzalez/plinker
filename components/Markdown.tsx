// packages
import * as mdx from "@mdx-js/react";
import Image from "next/image";
// components
import LinkComponent, { LinkProps } from "./Link";
// utils
import { highlightInputNotation } from "helpers/input";

function getIdFromChildren(children: React.ReactNode) {
  if (typeof children !== "string") {
    return undefined;
  }

  return children.trim().toLowerCase().replace(/ /g, "-");
}

function A(props: JSX.IntrinsicElements["a"]) {
  return <a {...props} />;
}

function P(props: JSX.IntrinsicElements["p"]) {
  return <p className="my-4" {...props} />;
}

function H1(props: JSX.IntrinsicElements["h1"]) {
  return <h1 className="h1 uppercase" {...props} />;
}

function H2(props: JSX.IntrinsicElements["h2"]) {
  return <h2 className="h2 my-4 scroll-mt-28 border-b border-neutral-500 pb-2 uppercase" {...props} />;
}

function H3(props: JSX.IntrinsicElements["h3"]) {
  return <h3 className="h3 my-2 scroll-mt-28 uppercase" {...props} />;
}

function H4(props: JSX.IntrinsicElements["h4"]) {
  return <h4 className="h4 uppercase" {...props} />;
}

function Ul(props: JSX.IntrinsicElements["ul"]) {
  return <ul className="my-2 ml-6 list-disc" {...props} />;
}

function Link(props: LinkProps) {
  return <LinkComponent {...props} />;
}

function InputBlock(props: { children: string }) {
  return (
    <span
      className="my-1px inline whitespace-pre-wrap rounded-xl bg-neutral-800 py-[2px] px-3 font-mono text-sm shadow-md shadow-black/30"
      dangerouslySetInnerHTML={{ __html: highlightInputNotation(props.children) }}
    />
  );
}

function TeamImages(props: { c1: string; c2: string; c3: string }) {
  const { c1, c2, c3 } = props;
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
}

const MarkdownComponents: React.ComponentProps<typeof mdx.MDXProvider>["components"] = {
  a: A,
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  ul: Ul,
  Link,
  InputBlock,
  TeamImages,
};

export default MarkdownComponents;
