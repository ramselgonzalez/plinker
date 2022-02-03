import { NextPage } from "next";
import Head from "next/head";
import Container from "components/Container";
import CharacterSelect from "components/CharacterSelect";
import CharacterSelectItem from "components/CharacterSelectItem";
import CharacterSelectPreview from "components/CharacterSelectPreview";
import CharacterSelectSection from "components/CharacterSelectSection";
import characters from "data/characters";

const orderSort = characters.slice().sort((a, b) => a.selectOrder - b.selectOrder);
const nameSort = characters.slice().sort((a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
});

const marvel = orderSort.filter((c) => c.franchise === "Marvel");
const capcom = orderSort.filter((c) => c.franchise === "Capcom");

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Plinker</title>
        <meta property="og:title" content="Home | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:description" content="Frame data and details for Ultimate Marvel vs. Capcom." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
      </Head>
      <Container className="home-container">
        <CharacterSelect className="character-select-desktop">
          <CharacterSelectSection className="character-select-column-left" variant="column">
            {capcom.map((c) => (
              <CharacterSelectItem
                alt={c.name}
                imageUrl={`/images/thumbnails_${c.id}.webp`}
                key={c.id}
                value={c}
                variant="capcom"
              />
            ))}
          </CharacterSelectSection>
          <CharacterSelectPreview />
          <CharacterSelectSection className="character-select-column-right" variant="column">
            {marvel.map((c) => (
              <CharacterSelectItem
                alt={c.name}
                imageUrl={`/images/thumbnails_${c.id}.webp`}
                key={c.id}
                value={c}
                variant="marvel"
              />
            ))}
          </CharacterSelectSection>
        </CharacterSelect>
        <CharacterSelect className="character-select-mobile">
          <CharacterSelectPreview />
          <CharacterSelectSection variant="carousel">
            {nameSort.map((c) => (
              <CharacterSelectItem
                alt={c.name}
                imageUrl={`/images/thumbnails_${c.id}.webp`}
                key={c.id}
                value={c}
                variant={c.franchise === "Marvel" ? "marvel" : "capcom"}
              />
            ))}
          </CharacterSelectSection>
        </CharacterSelect>
      </Container>
    </>
  );
};

export default Home;
