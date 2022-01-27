import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { characters } from "constants/characters";

interface CharacterPageProps {
  id: string;
  name: string;
}

function Character(props: CharacterPageProps) {
  const { id, name } = props;
  return (
    <div>
      <Link href="/">← Back to character select</Link>
    </div>
  );
}

export const getStaticProps: GetStaticProps = ({ params }) => {
  const character = characters.find((c) => c.id === params?.id);
  return {
    props: {
      id: character?.id,
      name: character?.name,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = characters.map((c) => ({ params: { id: c.id } }));
  return {
    paths,
    fallback: false,
  };
};

export default Character;
