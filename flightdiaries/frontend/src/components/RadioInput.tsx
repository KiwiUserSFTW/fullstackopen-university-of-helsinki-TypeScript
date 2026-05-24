import { type JSX } from "react";

const RadioInput = <T extends string>({
  buttons,
  selectedValue,
  title,
  setRadioButton,
}: {
  buttons: T[];
  selectedValue: T;
  title: string;
  setRadioButton: (name: T) => void;
}): JSX.Element => (
  <p>
    {title}
    {buttons.map((button) => (
      <label key={button}>
        <input
          value={button}
          type="radio"
          checked={selectedValue === button}
          onChange={() => setRadioButton(button)}
          name={title + "Radio"}
        />
        {button}
      </label>
    ))}
  </p>
);

export default RadioInput;
