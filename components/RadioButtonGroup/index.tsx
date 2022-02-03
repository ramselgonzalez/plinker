interface RadioButtonGroup {
  children: React.ReactNode;
}

function RadioButtonGroup(props: RadioButtonGroup) {
  const { children } = props;
  return <div className="radio-button-group">{children}</div>;
}

export default RadioButtonGroup;
