import Typography from "components/Typography";

interface MovePreviewExtraInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  attributes: Array<string>;
  notes: Array<string>;
}

function MovePreviewExtraInfo(props: MovePreviewExtraInfoProps) {
  const { attributes, notes, ...rest } = props;
  return (
    <div className="move-preview-extra-info" {...rest}>
      <Typography className="bottom-gutter text-shadow-blue underline uppercase" color="blue" variant="h3">
        Extra Info
      </Typography>
      {attributes.length > 0 && (
        <div className="move-preview-attributes">
          {attributes.map((a, i) => (
            <span className="move-preview-attributes-item" key={i}>
              {a}
            </span>
          ))}
        </div>
      )}
      {notes.length > 0 && (
        <ul className="move-preview-notes">
          {notes.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MovePreviewExtraInfo;
