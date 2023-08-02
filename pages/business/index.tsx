import { hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import FilledButton from "../../components/Button/FilledButton";
import BasicHeader from "../../components/Headers/BasicHeader";
import { formatNumber } from "../../utils/functions";

interface PriceCard {
  type: string;
  price: number;
  singlePrice: number;
  bus: string;
  tools: string[];
}

const setPriceCardData = (type: "pro" | "std"): PriceCard => {
  if (type == "std") {
    return {
      type: "Fast Start",
      price: 99000,
      singlePrice: 119000,
      bus: "12인승 버스 X 2대",

      tools: [
        "Free Plan의 모든 기능",
        "버스 노선 표시 (월 5회 변경)",
        "실시간 버스 속도 표시",
        "도착 예정시간 표시",
      ],
    };
  } else {
    return {
      type: "Accelerate",
      price: 499000,
      singlePrice: 599000,
      bus: "45인승 버스 X 3대",
      tools: [
        "Fast Plan의 모든 기능",
        "실시간 버스 노선",
        "교통정보 반영",
        "최적화 노선 생성",
        "실시간 도착 예정 시간",
        "실시간 잔여 거리",
        "탑승자 안심번호",
      ],
    };
  }
};

export default function Home() {
  const router = useRouter();
  let priceType = router.query.type || "std";
  if (priceType != "pro" && priceType != "std") {
    priceType = "std";
  }

  const cardData = setPriceCardData(priceType as "pro" | "std");

  return (
    <div className="w-screen h-screen bg-white flex flex-col">
      <BasicHeader />
      <div className="sm:w-full sm:mx-auto sm:max-w-3xl h-full">
        <Container>
          <div className="px-[24px] border-solid border rounded-[10px] py-[32px] mx-[12px]">
            <h2 className="text-[#00153B] text-[24px] leading-[28px] font-bold">
              {cardData.type}
            </h2>
            <p className="text-[#00153B] text-[56px] leading-[72px] font-bold">
              ₩{formatNumber(cardData.price)}
            </p>
            <div>
              <p className="text-[#717F87] text-[20px] leading-[28px] font-medium">
                ₩{formatNumber(cardData.singlePrice)} per month
              </p>
              <p className="text-[#717F87] text-[20px] leading-[28px] font-medium">
                {cardData.bus}
              </p>
            </div>
            <div className="mt-[24px]">
              {cardData.tools.map((tool) => (
                <p className="text-[#717F87] text-[16px] leading-[24px] font-medium">
                  {tool}
                </p>
              ))}
            </div>
          </div>
          <div className="mx-[12px] flex flex-col">
            <div className="w-full flex flex-row justify-between">
              <div>
                <p>
                  <strong>+ {cardData.type}</strong>
                </p>
              </div>
              <div>
                <p className="text-xl">{formatNumber(cardData.price)}</p>
              </div>
            </div>
            <hr className="my-[12px]" />
            <div className="w-full flex flex-col gap-[8px]">
              <div className="w-full flex flex-row justify-end items-center">
                <p className="text-2xl">월 {formatNumber(cardData.price)}원</p>
              </div>
              <div className="w-full flex flex-row justify-end items-center gap-[4px]">
                <input id="service" type={"checkbox"} />
                <Link href={"/policy/service"}>
                  <a className="text-sm">이용약관</a>
                </Link>
              </div>
              <div className="w-full flex flex-row justify-end items-center">
                <FilledButton text="구매" size="b" />
              </div>
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
