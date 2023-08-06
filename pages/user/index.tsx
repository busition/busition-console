import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import UserPageHeader from "../../components/Headers/UserPageHeader";
import { isExpired } from "../../utils/functions";

const ItemCard = () => {
  const router = useRouter();

  return (
    <div className="border-2 border-solid rounded-lg flex flex-col px-[24px] py-[24px] ml-[12px] mt-[24px]">
      <p className="font-semibold text-xl pb-[16px]">버지션 콘솔</p>
      <p>
        버스 위치와 노선 정보를 확인하고 관리할 수 있는 콘솔 창으로 이동합니다.
      </p>
      <div className="flex flex-row justify-end pt-[8px]">
        <Button
          text="이동"
          primary={true}
          onClick={() => router.push("/console")}
        />
      </div>
    </div>
  );
};

const userPage = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const router = useRouter();
  const userBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (userBox.current) {
        if (userBox.current.scrollTop == 0) {
          setIsScroll(false);
        } else {
          setIsScroll(true);
        }
      }
    };

    if (userBox.current) {
      userBox.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (userBox.current) {
        userBox.current?.removeEventListener("scroll", handleScroll);
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
            <li className="mx-auto px-[16px] text-sm">홈</li>
            <li className="mx-auto px-[16px] text-sm">개인 정보</li>
            <li className="mx-auto px-[16px] text-sm">구독 및 결제</li>
          </ul>
        </nav>
      </div>
      <SideNav className="">
        <div>홈</div>
        <div>개인 정보</div>
        <div>결제 및 구독</div>
      </SideNav>
      <Container className="overflow-y-scroll" ref={userBox}>
        <div className="lg:px-[48px] lg:max-w-[1120px] max-w-[840px] px-[24px] mx-auto">
          <div className="h-[30%] flex flex-col justify-center items-center pt-[24px]">
            <p className="text-2xl font-semibold">
              이승원님, 버지션 사용을 환영합니다.
            </p>
            <p className="mt-5">
              이 페이지에서 노선 및 관련 정보를 확인할 수 있습니다.
            </p>
          </div>

          <ItemCard />
          <ItemCard />

          <ItemCard />

          <ItemCard />

          <ItemCard />
        </div>
      </Container>
    </MainContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!hasCookie("token", { req, res })) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else if (isExpired(getCookie("token", { req, res }) as string)) {
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

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 64px 1fr;
  @media (max-width: 767px) {
    grid-template-rows: 48px 1fr;
  }
`;

const Container = styled.div`
  height: 100%;
  display: block;

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
  padding-top: 20px;

  @media (max-width: 1024px) {
    display: none;
  }

  div {
    padding: 10px 0;
    padding-left: 24px;
    padding-right: 16px;
  }
`;

export default userPage;
