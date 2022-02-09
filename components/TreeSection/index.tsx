import { useMemo, useRef, useState } from "react";
import cn from "classnames";
import Typography from "components/Typography";

interface TreeSectionProps {
  children: React.ReactNode;
  label: string;
}

function TreeSection(props: TreeSectionProps) {
  const { children, label } = props;
  const ref = useRef<HTMLUListElement | null>(null);
  const [open, setOpen] = useState(false);

  const style = useMemo(() => {
    if (!open || !ref.current) {
      return undefined;
    }

    return {
      maxHeight: ref.current.scrollHeight,
    };
  }, [open, ref]);

  return (
    <li>
      <button className="tree-item tree-section-label" onClick={() => setOpen(!open)}>
        <svg
          aria-hidden="true"
          className={cn("tree-section-label-icon", {
            ["tree-section-label-icon-open"]: open,
          })}
          height={18}
          fill="white"
          focusable="false"
          viewBox="0 0 24 24"
          width={18}
        >
          <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
        </svg>
        <Typography>{label}</Typography>
      </button>
      <ul className="tree-section" ref={ref} style={style}>
        {children}
      </ul>
    </li>
  );
}

export default TreeSection;
