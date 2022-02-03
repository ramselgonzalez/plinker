import Link from "next/link";
interface MovePreviewProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
}

function MovePreview(props: MovePreviewProps) {
  const { children, to, ...rest } = props;
  return (
    <Link href={to}>
      <a className="move-preview-container" draggable="false" {...rest}>
        {children}
      </a>
    </Link>
  );
}

export default MovePreview;
