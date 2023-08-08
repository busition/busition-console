import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
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

const Home = () => {
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
            <li className="mx-auto px-[16px] text-sm border-solid border-b-blue-500 border-b-4 h-full flex flex-col justify-center">
              <Link href={"/management"}>
                <a>홈</a>
              </Link>
            </li>
            <li className="mx-auto px-[16px] text-sm">
              <Link href={"/management/driver"}>
                <a>기사 배정</a>
              </Link>
            </li>
            <li className="mx-auto px-[16px] text-sm">
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
              <li className="border-solid border-r-blue-500 border-r-4">홈</li>
            </a>
          </Link>
          <Link href={"/management/driver"}>
            <a>
              <li>기사 배정</li>
            </a>
          </Link>
          <Link href={"/management/organization"}>
            <a>
              <li>기관 코드</li>
            </a>
          </Link>
        </ul>
      </SideNav>
      <Container className="overflow-y-scroll block" ref={userBox}>
        <div className="lg:px-[48px] lg:max-w-[1120px] max-w-[840px] px-[24px] mx-auto">
          <div className="h-[30%] flex flex-col justify-center items-center pt-[24px]">
            <p className="text-2xl font-semibold">
              이승원님, 버지션 사용을 환영합니다.
            </p>
            <p className="mt-5">버지션 관리 페이지 입니다.</p>
          </div>

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

export default Home;
