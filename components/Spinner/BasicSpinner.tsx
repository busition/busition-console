import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getSpin } from "../../utils/states";

export default function BasicSpinner() {
  const [isSpin, setIsSpin] = useRecoilState<boolean>(getSpin);

  return (
    <>
      {isSpin && (
        <Background className="fixed w-screen h-screen flex justify-center items-center">
          <Image
            alt="loading"
            src="/spinner/basicSpinner.gif"
            width={100}
            height={100}
          />
        </Background>
      )}
    </>
  );
}

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
`;
