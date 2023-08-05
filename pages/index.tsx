import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import HomeHeader from "../components/Headers/HomeHeader";
import styled from "styled-components";
import HomeFooter from "../components/Footer/HomeFooter";

const Home: NextPage = () => {
  const router = useRouter();

  const handleAppRoute = (id: string, type: string) => {
    if (type == "android") {
      if (id == "driver") {
        window.open(
          "https://play.google.com/store/apps/details?id=com.busition.driver"
        );
      } else if (id == "mate") {
        window.open(
          "https://play.google.com/store/apps/details?id=com.busition.user"
        );
      }
    } else if (type == "apple") {
      if (id == "mate") {
        window.open(
          "https://drive.google.com/file/d/1cFUXjQKzAKc3-E_1TapGMXaby0wiT_B7/view?usp=sharing"
        );
      }
    }
  };
  const handleBusinessRouter = (type: "std" | "pro") => {
    router.push({
      pathname: "/business",
      query: {
        type,
      },
    });
  };

  return (
    <div className="bg-[#fafafa]">
      <HomeHeader />

      <section className="h-[100vh]" id="home">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">
            Busition
          </h1>

          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-lg sm:text-2xl">추가 장비 없이</h3>
              <h3 className="text-lg sm:text-2xl">
                스마트 버스를 사용하고 싶다면?
              </h3>
              <h3 className="text-lg sm:text-2xl">지금 바로 Busition으로!</h3>
            </div>
            <Button text="Get started" primary={true} link="/console" />
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="console">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">
            Console
          </h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-3xl sm:text-3xl font-bold mb-4">
                관리자용 웹 콘솔
              </h3>
              <h3 className="text-lg sm:text-2xl">
                스케줄 관리, 탑승자 및 기사 배정
              </h3>
              <h3 className="text-lg sm:text-2xl">버스 현황 관리</h3>
            </div>
            <Button text="콘솔로 이동하기" primary={true} link="/console" />
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="driver">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">Driver</h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center px-4">
            <div>
              <h2 className="text-3xl sm:text-3xl font-bold mb-4">
                기사용 안드로이드 앱
              </h2>
              <h3 className="text-lg sm:text-2xl">
                실시간 스케줄, 탑승자 명단, 잔여시간/거리 제공
              </h3>
              <h3 className="text-lg sm:text-2xl">최적 노선, 네비 자동 연결</h3>
            </div>
            <button
              className="cursor-pointer relative w-[150px] h-[50px] sm:w-[170px] sm:h-[55px] border-solid border-2 rounded-lg shadow-lg"
              onClick={() => handleAppRoute("driver", "android")}
            >
              <Image
                className="z-0"
                src={"/store/playStore.png"}
                layout="fill"
                objectFit="cover"
              />
            </button>
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="mate">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">Mate</h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center px-4">
            <div>
              <h2 className="text-3xl sm:text-3xl font-bold mb-4">
                탑승자, 보호자용 앱
              </h2>
              <h3 className="text-lg sm:text-2xl">
                실시간 버스 위치, 도착 예정 시간, 잔여 좌석 정보 제공
              </h3>
              <h3 className="text-lg sm:text-2xl">
                친구 공유, 승하차 알림 기능
              </h3>
            </div>
            <div className="flex flex-row gap-4">
              <button
                className="cursor-pointer relative w-[150px] h-[50px] sm:w-[170px] sm:h-[55px] border-solid border-2 rounded-lg shadow-lg"
                onClick={() => handleAppRoute("mate", "android")}
              >
                <Image
                  className="z-0"
                  src={"/store/playStore.png"}
                  layout="fill"
                  objectFit="cover"
                />
              </button>
              <div className="w-[150px] h-[50px] sm:w-[170px] sm:h-[55px] border-solid border-2 rounded-lg px-1 py-1 shadow-lg">
                <button
                  className="relative w-full h-full"
                  onClick={() => handleAppRoute("mate", "apple")}
                >
                  <Image
                    className="z-0"
                    src={"/store/appStore.png"}
                    layout="fill"
                    objectFit="contain"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="" id="price">
        <div className="flex min-h-[50vh] sm:min-h-[70vh] md:min-h-[100vh] pt-[30px] px-[40px] justify-center items-center">
          <div className="min-w-full">
            <div className="mt-[20px] grid lg:grid-cols-3 gap-[20px]">
              <div
                key="1"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Starter
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Trial
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      Free
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      전액 무료
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      9인승 버스 X 1대
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      실시간 버스 위치
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      스케줄 관리
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      버스 노선 표시 (월 1회 변경)
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold cursor-not-allowed">
                      Current Plan
                    </button>
                  </div>
                </div>
              </div>

              <div
                key="2"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Value
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Fast Start
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      ₩99,000
                      <span className="text-sm block lg:inline-block">
                        / 연간, 매월 지불
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      ₩119,000 per month
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      12인승 버스 X 2대
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Free Plan의 모든 기능
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      버스 노선 표시 (월 5회 변경)
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      실시간 버스 속도 표시
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      도착 예정시간 표시
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button
                      onClick={() => handleBusinessRouter("std")}
                      className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
                    >
                      Upgrade +
                    </button>
                  </div>
                </div>
              </div>

              <div
                key="3"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Pro
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Accelerate
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[64px] font-bold">
                      ₩499,000
                      <span className="text-sm block lg:inline-block">
                        / 연간, 매월 지불
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      ₩599,000 per month
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      45인승 버스 X 3대
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Fast Plan의 모든 기능
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      실시간 버스 노선
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      교통정보 반영
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      최적화 노선 생성
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      실시간 도착 예정 시간
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      실시간 잔여 거리
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      탑승자 안심번호
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button
                      onClick={() => handleBusinessRouter("pro")}
                      className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
                    >
                      Upgrade +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="h-[100vh] flex flex-col justify-center items-center"
        id=""
      >
        <h1 className="text-3xl">
          Busition과 <strong>함께하는 파트너</strong>
        </h1>
        <h3 className="mt-8 text-gray-400 mx-4">
          Busition 파트너로 선정되시면 베타서비스를 무료로 사용하실 수 있습니다.
        </h3>
        <Link href={"https://forms.gle/DPj81VcvKwNcE2ZK8"}>
          <a target="_blank">
            <div className="flex px-12 py-2 rounded-full shadow-lg mt-12 bg-[#fff] cursor-pointer">
              <h3 className="text-blue-500">신청하기</h3>
            </div>
          </a>
        </Link>
      </section>
      <HomeFooter />
    </div>
  );
};

export default Home;
