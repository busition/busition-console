import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import UserPageHeader from "../Headers/UserPageHeader";

interface Props {
  navigation: "home" | "driver" | "org" | "assignment";
}

export default function ManagementLayout({
  children,
  navigation,
}: React.PropsWithChildren<Props>) {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const router = useRouter();
  const userBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (userBox.current?.scrollTop != 0) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    if (userBox.current) {
      userBox.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (userBox.current) {
        userBox.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <MainContainer className="overflow-hidden relative">
      <UserPageHeader
        isScroll={isScroll}
        handleClick={() => {
          deleteCookie("token");
          router.reload();
        }}
      />
      <div
        className={`w-full block z-10 mt-[-10px] pt-[10px] lg:hidden ${
          isScroll ? "shadow-md" : ""
        } border-solid border-b`}
      >
        <nav>
          <ul className="w-full flex flex-row h-[48px] items-center">
            <li
              className={`mx-auto px-[16px] text-sm ${
                navigation == "home" &&
                "border-solid border-b-blue-500 border-b-4 h-full flex flex-col justify-center font-semibold"
              }`}
            >
              <Link href={"/management"}>
                <a>홈</a>
              </Link>
            </li>
            <li
              className={`mx-auto px-[16px] text-sm ${
                navigation == "assignment" &&
                "border-solid border-b-blue-500 border-b-4 h-full flex flex-col justify-center font-semibold"
              }`}
            >
              <Link href={"/management/driver/assignment"}>
                <a>기사 배정</a>
              </Link>
            </li>
            <li
              className={`mx-auto px-[16px] text-sm ${
                navigation == "driver" &&
                "border-solid border-b-blue-500 border-b-4 h-full flex flex-col justify-center font-semibold"
              }`}
            >
              <Link href={"/management/driver"}>
                <a>기사 관리</a>
              </Link>
            </li>
            <li
              className={`mx-auto px-[16px] text-sm ${
                navigation == "org" &&
                "border-solid border-b-blue-500 border-b-4 h-full flex flex-col justify-center font-semibold"
              }`}
            >
              <Link href={"/management/organization"}>
                <a>기관 코드</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <SideNav className="border-solid border-r">
        <ul>
          <Link href={"/management"}>
            <a>
              <li
                className={`${
                  navigation == "home" &&
                  "border-solid border-r-blue-500 border-r-4 font-semibold"
                }`}
              >
                홈
              </li>
            </a>
          </Link>
          <Link href={"/management/driver/assignment"}>
            <a>
              <li
                className={`${
                  navigation == "assignment" &&
                  "border-solid border-r-blue-500 border-r-4 font-semibold"
                }`}
              >
                기사 배정
              </li>
            </a>
          </Link>
          <Link href={"/management/driver"}>
            <a>
              <li
                className={`${
                  navigation == "driver" &&
                  "border-solid border-r-blue-500 border-r-4 font-semibold"
                }`}
              >
                기사 관리
              </li>
            </a>
          </Link>
          <Link href={"/management/organization"}>
            <a>
              <li
                className={`${
                  navigation == "org" &&
                  "border-solid border-r-blue-500 border-r-4 font-semibold"
                }`}
              >
                기관 코드
              </li>
            </a>
          </Link>
        </ul>
      </SideNav>
      <Container className="overflow-y-scroll block" ref={userBox}>
        <div className="lg:px-[48px] lg:max-w-[1120px] max-w-[840px] px-[24px] mx-auto">
          {children}
        </div>
      </Container>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  height: 100%;

  @media (min-width: 1024px) {
    margin-left: 280px;
  }
`;

const SideNav = styled.nav`
  position: absolute;
  top: 64px;
  left: 0;
  z-index: 1;
  width: 280px;
  height: 100%;
  padding-top: 20px;

  @media (max-width: 1024px) {
    display: none;
  }

  li {
    padding: 10px 0;
    padding-left: 24px;
    padding-right: 16px;
  }
`;
