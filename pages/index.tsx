// packages
import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
// components
import Page from "components/Page";
import Typography from "components/Typography";
import CharacterSelectItem from "components/CharacterSelectItem";
// utils
import { getCharacterSortByFranchise, getCharacterMobileSort } from "helpers/character";
import { getCharacterPreviews } from "lib/character";
import { Franchise, ICharacterPreview } from "types";
import routes from "routes";

interface HomeProps {
  characters: Array<ICharacterPreview>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { characters } = props;
  const mobileSort = getCharacterMobileSort(characters);
  const marvel = getCharacterSortByFranchise(characters, Franchise.Marvel);
  const capcom = getCharacterSortByFranchise(characters, Franchise.Capcom);

  return (
    <>
      <Head>
        <title>Plinker</title>
        <meta content="Home | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3" property="og:title" />
        <meta content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} property="og:image" />
        <meta content="Frame data and details for Ultimate Marvel vs. Capcom 3." property="og:description" />
        <meta content="image/png" property="og:image:type" />
        <meta content="Akuma performaing Gohadoken L" property="og:image:alt" />
      </Head>
      <Page className="mt-4 px-4 pt-34 md:mt-0">
        {/* desktop view */}
        <div className="hidden w-full lg:flex">
          <div className="grid-rows-7 grid grid-cols-4 gap-x-3 gap-y-3">
            {capcom.map((c, i) => (
              <CharacterSelectItem
                alt={c.name}
                className={i === 1 ? "col-start-1" : ""}
                imageUrl={`/images/portraits/thumbnails_${c.id}.webp`}
                key={c.id}
                href={routes.overview(c.id)}
                disabled={c.id !== "zero"}
              />
            ))}
          </div>
          <div className="flex h-full flex-1 flex-col items-center justify-center">
            <Typography className="uppercase" variant="h1">
              Plinker
            </Typography>
            <Typography className="uppercase" color="gray" component="p" variant="h4">
              Select a character
            </Typography>
          </div>
          <div className="grid-rows-7 grid grid-cols-4 gap-x-3 gap-y-3">
            {marvel.map((c, i) => (
              <CharacterSelectItem
                alt={c.name}
                className={i === 0 ? "col-start-4" : ""}
                imageUrl={`/images/portraits/thumbnails_${c.id}.webp`}
                key={c.id}
                href={routes.overview(c.id)}
                disabled={c.id !== "zero"}
              />
            ))}
          </div>
        </div>
        {/* mobile view */}
        <div className="w-full overflow-y-hidden lg:hidden">
          <div className="flex h-full flex-col items-center justify-center">
            <Typography className="uppercase" variant="h1">
              Plinker
            </Typography>
            <Typography className="uppercase" color="gray" variant="subheading1">
              Select a character
            </Typography>
          </div>
          <div className="fixed bottom-0 left-0 grid w-full grid-cols-50 gap-x-3 overflow-x-scroll border-t border-t-neutral-500 bg-neutral-900 p-4">
            {mobileSort.map((c) => (
              <CharacterSelectItem
                alt={c.name}
                imageUrl={`/images/portraits/thumbnails_${c.id}.webp`}
                key={c.id}
                href={routes.overview(c.id)}
              />
            ))}
          </div>
        </div>
      </Page>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const characters = getCharacterPreviews();
  return {
    props: {
      characters,
    },
  };
};

export default Home;
