import Image from "next/image";
import Link from "next/link";
import DataRow from "components/DataRow";
import StatSection from "components/StatSection";
import StatSectionFooter from "components/StatSectionFooter";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";

function getFirebaseStorageImageURL(characterId: string) {
  return `https://firebasestorage.googleapis.com/v0/b/wave-dash-tool.appspot.com/o/thumbnails%2F${characterId}.png?alt=media`;
}

function CharacterSelectPreview({ selectedCharacter }: { selectedCharacter: { id: string; name: string } | null }) {
  if (!selectedCharacter) {
    return (
      <div className="home-welcome-cta">
        <Typography className="uppercase" variant="h1">
          Plinker
        </Typography>
        <Typography className="uppercase" color="gray" variant="subheading1">
          Select a character
        </Typography>
      </div>
    );
  }

  return (
    <div className="character-select-preview">
      <div className="character-select-preview-model">
        <Image
          alt={selectedCharacter.name}
          className="character-select-image"
          layout="fill"
          src={getFirebaseStorageImageURL(selectedCharacter.id)}
        />
      </div>
      <StatSection>
        <StatSectionHeader>{selectedCharacter.name}</StatSectionHeader>
        <DataRow label="Health" value="900,000" />
        <DataRow label="Recommended Position" value="Point" />
        <DataRow label="Archetype" value="Rushdown" />
        <DataRow label="Difficulty" value="Medium" />
        <DataRow label="Tier" value="S" />
        <StatSectionFooter>
          <Link href="/overview">
            <a className="color-white">View Character</a>
          </Link>
        </StatSectionFooter>
      </StatSection>
    </div>
  );
}

export default CharacterSelectPreview;
