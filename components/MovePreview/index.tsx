interface MovePreviewProps extends React.ComponentPropsWithoutRef<"div"> {}

function MovePreview(props: MovePreviewProps) {
  const { children, ...rest } = props;
  return (
    <div className="move-preview-container" {...rest}>
      {children}
    </div>
  );
}

export default MovePreview;
