const { withPlaiceholder } = require("@plaiceholder/next");
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withPlaiceholder(
  withMDX({
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    reactStrictMode: true,
  })
);
