import React from "react";
import cn from "classnames";

type SelectableCharacter = {
  id: string;
  name: string;
};

interface CharacterSelectSectionProps {
  children: React.ReactNode;
  className?: string;
  selectedCharacter?: SelectableCharacter | null;
  variant: "column" | "carousel";
}

function CharacterSelectSection(props: CharacterSelectSectionProps) {
  const { children: childrenProp, className, selectedCharacter, variant, ...rest } = props;

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    return React.cloneElement(child, {
      selected: selectedCharacter?.id === child.props.value.id,
      ...rest,
    });
  });

  return (
    <div
      className={cn({
        [`character-select-${variant}`]: variant,
        [`${className}`]: className,
      })}
    >
      {children}
    </div>
  );
}

export default CharacterSelectSection;
