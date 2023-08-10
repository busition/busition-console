import styled from "styled-components";

interface Props {
  text: string;
  onClick?: () => void;
}

export default function BorderButton({ text, onClick = () => {} }: Props) {
  return <BasicButton onClick={onClick}>{text}</BasicButton>;
}

const BasicButton = styled.button`
  border: solid 1px rgba(25, 118, 210, 0.5);
  padding: 3px 9px;
  color: rgb(25, 118, 210);
  border-radius: 4px;
`;
