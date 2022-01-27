import { useState } from "react";
import Link from "next/link";

interface TreeViewProps extends React.ComponentPropsWithoutRef<"ul"> {
  sections: Array<TreeViewSection>;
}

type TreeViewItem = {
  id: string;
  label: string;
};

type TreeViewSection = {
  id: string;
  label: string;
  items: Array<TreeViewItem>;
};

function initState(sections: Array<TreeViewSection>) {
  const keys = sections.map((s) => s.id);
  const state: { [key: string]: boolean } = {};
  for (let i = 0; i < keys.length; i++) {
    state[keys[i]] = i === 0 ? true : false;
  }

  return state;
}

function generateClassName(active: boolean) {
  let classes = "nested-tree-list";
  if (active) {
    classes = classes + " " + "nested-tree-list-open";
  }

  return classes;
}

function TreeView(props: TreeViewProps) {
  const { sections, ...rest } = props;
  const [state, setState] = useState(() => initState(sections));

  function toggleState(key: string) {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  }

  return (
    <ul {...rest}>
      {sections.map((section) => (
        <li key={section.id}>
          <button className="typography--variant-body1 link" onClick={() => toggleState(section.id)}>
            {section.label}
          </button>
          <ul className={generateClassName(state[section.id])}>
            {section.items.map((m) => (
              <li key={m.id}>
                <Link href={`#${m.id}`}>
                  <a style={{ cursor: "pointer" }}>{m.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default TreeView;
