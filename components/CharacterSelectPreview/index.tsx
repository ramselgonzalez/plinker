import Image from "next/image";
import Link from "next/link";
import DataRow from "components/DataRow";
import StatSection from "components/StatSection";
import StatSectionFooter from "components/StatSectionFooter";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";

type SelectableCharacter = {
  id: string;
  name: string;
};

interface CharacterSelectPreviewProps {
  selectedCharacter?: SelectableCharacter;
}

function CharacterSelectPreview(props: CharacterSelectPreviewProps) {
  const { selectedCharacter } = props;

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
    <div key={selectedCharacter.id} className="character-select-preview">
      <div className="character-select-preview-model">
        <Image
          alt={selectedCharacter.name}
          className="character-select-preview-model-image"
          objectFit="cover"
          layout="fill"
          src={`/images/thumbnails_${selectedCharacter.id}.webp`}
        />
      </div>
      <StatSection>
        <StatSectionHeader>
          <Typography color="blue" shadow uppercase variant="h3">
            {selectedCharacter.name}
          </Typography>
          <Link href="/overview">
            <a className="typography-subheading1 uppercase">View Full Details</a>
          </Link>
        </StatSectionHeader>
        <DataRow label="Health" value="900,000" />
        <DataRow label="Recommended Position" value="Point" />
        <DataRow label="Archetype" value="Rushdown" />
        <DataRow label="Difficulty" value="Medium" />
      </StatSection>
    </div>
  );
}

export default CharacterSelectPreview;
