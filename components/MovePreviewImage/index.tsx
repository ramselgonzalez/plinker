import Image from "next/image";

interface MovePreviewProps {
  alt?: string;
  src?: string;
}

function MovePreviewImage(props: MovePreviewProps) {
  const { alt, src } = props;
  return (
    <div className="move-preview-image-container">
      {src && <Image alt={alt} layout="fill" src={src} objectFit="cover" />}
    </div>
  );
}

export default MovePreviewImage;
