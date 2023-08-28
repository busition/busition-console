import styled from "styled-components";

interface Props {
  text: string;
  size?: "b" | "m" | "s";
  handleOnclick?: () => void;
  submit?: boolean;
}

const FilledButton = ({
  text,
  size = "m",
  handleOnclick = () => {},
  submit = false,
}: Props) => {
  return (
    <StyledButton
      size={size}
      onClick={handleOnclick}
      type={submit ? "submit" : "button"}
    >
      {text}
    </StyledButton>
  );
};

export default FilledButton;

const StyledButton = styled.button<{ size: "b" | "m" | "s" }>`
  padding: ${(prop) => {
    if (prop.size == "b") {
      return "8px 22px";
    } else if (prop.size == "m") {
      return "6px 16px";
    } else {
      return "4px 10px";
    }
  }};
  background-color: rgb(25, 118, 210);
  color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;
