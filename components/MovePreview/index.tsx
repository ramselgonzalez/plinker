import cn from "classnames";

interface MovePreviewProps extends React.ComponentPropsWithoutRef<"div"> {}

function MovePreview(props: MovePreviewProps) {
  const { children, className, ...rest } = props;
  return (
    <div
      className={cn("flex bg-neutral-800 md:rounded-2xl", {
        [`${className}`]: className,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

export default MovePreview;
