import NextHead from "next/head";
import meta, { Page } from "helpers/meta";

interface IHeadProps {
  page: Page;
  name: string;
  cid: string;
  move?: string;
  mid?: string;
}

function Head(props: IHeadProps) {
  const { page, name, cid, move, mid } = props;
  const getMetadata = meta[page];
  const { title, description, imgUrl, imgAlt } = getMetadata(name, cid, move, mid);
  return (
    <NextHead>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={imgAlt} />
      <meta property="og:image" content={imgUrl} />
      <meta name="twitter:card" content="summary_large_image" />
    </NextHead>
  );
}

export default Head;
