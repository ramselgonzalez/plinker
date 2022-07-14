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
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="image/png" property="og:image:type" />
      <meta content={imgAlt} property="og:image:alt" />
      <meta content={imgUrl} property="og:image" />
      <meta content="summary_large_image" name="twitter:card" />
    </NextHead>
  );
}

export default Head;
