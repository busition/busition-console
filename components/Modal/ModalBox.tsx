import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function ModalBox({ children }: PropsWithChildren) {
  return (
    <Container className="w-[50vw] h-[70vh] min-h-[250px] min-w-[350px] bg-white shadow-lg rounded border-solid border-2 z-50">
      {children}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 12px;
`;
