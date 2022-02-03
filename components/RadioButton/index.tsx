import cn from "classnames";

interface RadioButtonProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

function RadioButton(props: RadioButtonProps) {
  const { checked, label, ...rest } = props;

  return (
    <label
      className={cn("radio-button uppercase typography-subheading1", {
        ["radio-button-checked"]: checked,
      })}
    >
      {label}
      <input type="radio" checked={checked} {...rest} />
    </label>
  );
}

export default RadioButton;
