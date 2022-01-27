import { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Container from "components/Container";
import Typography from "components/Typography";
import CharacterSelect from "components/CharacterSelect";
import CharacterSelectItem from "components/CharacterSelectItem";
import CharacterSelectPreview from "components/CharacterSelectPreview";
import CharacterSelectSection from "components/CharacterSelectSection";
import characters from "data/characters";
import useMediaQuery from "hooks/useMediaQuery";

function getFirebaseStorageImageURL(characterId: string) {
  return `https://firebasestorage.googleapis.com/v0/b/wave-dash-tool.appspot.com/o/thumbnails%2F${characterId}.png?alt=media`;
}

const marvel = characters.filter((c) => c.franchise === "Marvel");
const capcom = characters.filter((c) => c.franchise === "Capcom");

const Home: NextPage = () => {
  console.log("render");
  return (
    <Container className="home-container">
      <CharacterSelect isMobile={false}>
        {({ selectedCharacter, onClick }) => (
          <>
            <CharacterSelectSection>
              {capcom.map((c) => (
                <CharacterSelectItem
                  alt={c.name}
                  imageUrl={getFirebaseStorageImageURL(c.id)}
                  key={c.id}
                  onClick={() => onClick(c)}
                  selected={selectedCharacter?.id === c.id}
                  variant="capcom"
                />
              ))}
            </CharacterSelectSection>
            <CharacterSelectPreview key={selectedCharacter?.id} selectedCharacter={selectedCharacter} />
            <CharacterSelectSection>
              {marvel.map((c) => (
                <CharacterSelectItem
                  alt={c.name}
                  imageUrl={getFirebaseStorageImageURL(c.id)}
                  key={c.id}
                  onClick={() => onClick(c)}
                  selected={selectedCharacter?.id === c.id}
                  variant="marvel"
                />
              ))}
            </CharacterSelectSection>
          </>
        )}
      </CharacterSelect>
      <CharacterSelect isMobile>
        {({ selectedCharacter, onClick }) => (
          <>
            <CharacterSelectPreview key={selectedCharacter?.id} selectedCharacter={selectedCharacter} />
            <div className="character-select-carousel">
              {characters.map((c) => (
                <CharacterSelectItem
                  alt={c.name}
                  imageUrl={getFirebaseStorageImageURL(c.id)}
                  key={c.id}
                  onClick={() => onClick(c)}
                  selected={selectedCharacter?.id === c.id}
                  variant={c.franchise === "Marvel" ? "marvel" : "capcom"}
                />
              ))}
            </div>
          </>
        )}
      </CharacterSelect>
    </Container>
  );
};

export default Home;
