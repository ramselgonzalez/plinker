import Link from "next/link";
import cn from "classnames";

interface MovePreviewProps extends React.ComponentPropsWithoutRef<"a"> {
  to: string;
}

function MovePreview(props: MovePreviewProps) {
  const { children, className, to, ...rest } = props;
  return (
    <Link href={to}>
      <a
        className={cn("move-preview-container", {
          [`${className}`]: className,
        })}
        draggable="false"
        {...rest}
      >
        {children}
      </a>
    </Link>
  );
}

export default MovePreview;
