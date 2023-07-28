import { hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import BasicHeader from "../../components/Headers/BasicHeader";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <BasicHeader />
      <div className="sm:w-full sm:mx-auto sm:max-w-3xl h-full">
        <Container>
          <div className="px-[24px] border-solid border rounded-[10px] py-[32px] mx-[12px]">
            <h2 className="text-[#00153B] text-[24px] leading-[28px] font-bold">
              Trial
            </h2>
            <p className="text-[#00153B] text-[56px] leading-[72px] font-bold">
              Free
            </p>
            <div>
              <p className="text-[#717F87] text-[20px] leading-[28px] font-medium">
                0 Credits
              </p>
              <p className="text-[#717F87] text-[20px] leading-[28px] font-medium">
                1 Bus + 9 Mates
              </p>
            </div>
            <div className="mt-[24px]">
              <p className="text-[#717F87] text-[16px] leading-[24px] font-medium">
                실시간 버스 위치
              </p>
              <p className="text-[#717F87] text-[16px] leading-[24px] font-medium">
                스케줄 관리
              </p>
              <p className="text-[#717F87] text-[16px] leading-[24px] font-medium">
                버스 노선 표시 (월 1회 변경)
              </p>
            </div>
          </div>
          <div>
            <p>여기에 구매관련 사항 들어가면 될듯</p>
            <div className="w-full flex flex-row justify-end items-center">
              <Button text="구매" primary={true} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!hasCookie("token", { req, res })) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;
