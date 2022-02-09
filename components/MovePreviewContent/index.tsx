import cn from "classnames";

interface MovePreviewContentProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

function MovePreviewContent(props: MovePreviewContentProps) {
  const { children, className } = props;
  return (
    <div
      className={cn("move-preview-content", {
        [`${className}`]: className,
      })}
    >
      {children}
    </div>
  );
}

export default MovePreviewContent;
