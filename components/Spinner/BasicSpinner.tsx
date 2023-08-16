import Image from "next/image";
import styled from "styled-components";

export default function BasicSpinner() {
  return (
    <Background className="fixed w-screen h-screen z-50 flex justify-center items-center">
      <Image
        alt="loading"
        src="/spinner/basicSpinner.gif"
        width={100}
        height={100}
      />
    </Background>
  );
}

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
`;
