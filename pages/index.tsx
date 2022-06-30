import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Page from "components/Page";
import Typography from "components/Typography";
import CharacterSelectItem from "components/CharacterSelectItem";
import { getCharacterPreviews } from "lib/character";
import { ICharacterPreview } from "types";

interface HomeProps {
  characters: Array<ICharacterPreview>;
}

const Home: NextPage<HomeProps> = (props) => {
  const { characters } = props;

  const orderSort = characters.slice().sort((a, b) => a.selectOrder - b.selectOrder);
  const mobileSort = characters.slice().sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  const marvel = orderSort.filter((c) => c.franchise === "marvel");
  const capcom = orderSort.filter((c) => c.franchise === "capcom");

  return (
    <>
      <Head>
        <title>Plinker</title>
        <meta property="og:title" content="Home | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:description" content="Frame data and details for Ultimate Marvel vs. Capcom 3." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
      </Head>
      <Page className="mt-4 px-4 pt-34 md:mt-0">
        {/* desktop view */}
        <div className="hidden w-full md:flex">
          <div className="grid-rows-7 grid grid-cols-4 gap-x-3 gap-y-3">
            {capcom.map((c, i) => (
              <CharacterSelectItem
                className={i === 1 ? "col-start-1" : ""}
                alt={c.name}
                imageUrl={`/images/portraits/thumbnails_${c.id}.webp`}
                key={c.id}
                value={c}
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
                className={i === 0 ? "col-start-4" : ""}
                alt={c.name}
                imageUrl={`/images/portraits/thumbnails_${c.id}.webp`}
                key={c.id}
                value={c}
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
                value={c}
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
