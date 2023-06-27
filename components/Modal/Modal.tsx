import { NextPage } from "next";
import styled from "styled-components";
import React, { PropsWithChildren, ReactElement, ReactNode } from "react";
import Button from "../Button/Button";

interface Props {
  isOpen: boolean;
  handleCloseModal: () => void;
}

export default function Dialog({
  isOpen,
  handleCloseModal,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {isOpen && (
        <Container className="w-[50vw] h-[50vh] min-h-[250px] min-w-[350px] flex flex-col justify-center items-center bg-white shadow-lg rounded border-solid border-2">
          <div className="w-full h-full">{children}</div>
          <div className="flex flex-row justify-end items-center w-full h-[74px] gap-4 pr-[12px] py-[12px]">
            <Button text="저장" primary={true} />
            <Button text="닫기" onClick={handleCloseModal} />
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
