import Image from "next/image";
import Link from "next/link";
import DataRow from "components/DataRow";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import { ICharacterPreview } from "types";

interface CharacterSelectPreviewProps {
  selectedCharacter?: ICharacterPreview;
}

function CharacterSelectPreview(props: CharacterSelectPreviewProps) {
  const { selectedCharacter } = props;

  if (!selectedCharacter) {
    return (
      <div className="home-welcome-cta">
        <Typography className="uppercase" gutter variant="h1">
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
      <Link href={`/${selectedCharacter.id}/overview`}>
        <a className="character-select-preview-model">
          <Image
            alt={selectedCharacter.name}
            className="character-select-preview-model-image"
            objectFit="cover"
            layout="fill"
            src={`/images/thumbnails_${selectedCharacter.id}.webp`}
          />
        </a>
      </Link>
      <StatSection>
        <StatSectionHeader>
          <Typography color="blue" shadow uppercase variant="h3">
            {selectedCharacter.name}
          </Typography>
          <Link href={`/${selectedCharacter.id}/overview`}>
            <a className="typography-subheading1 uppercase">View Character</a>
          </Link>
        </StatSectionHeader>
        <DataRow label="Health" value={selectedCharacter.health} />
        <DataRow label="Recommended Position" value={selectedCharacter.recommendedPosition} />
        <DataRow label="Archetype" value="Rushdown" />
        <DataRow label="Difficulty" value={selectedCharacter.difficulty} />
      </StatSection>
    </div>
  );
}

export default CharacterSelectPreview;
