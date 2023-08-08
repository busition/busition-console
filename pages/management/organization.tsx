import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import FilledButton from "../../components/Button/FilledButton";
import UserPageHeader from "../../components/Headers/UserPageHeader";
import { isExpired } from "../../utils/functions";

const Home = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const router = useRouter();
  const userBox = useRef<HTMLDivElement>(null);
  const [orgCode, setOrgCode] = useState<{
    join_code: string;
    generated_at: string;
    expires_at: string;
  }>({ join_code: "", generated_at: "", expires_at: "" });

  const getOrgCode = async () => {
    await fetch("/api/organizations/join-code", {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrgCode({
          join_code: data.join_code,
          expires_at: data.expires_at,
          generated_at: data.generated_at,
        });
      });
  };

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
            <li className="mx-auto px-[16px] text-sm ">
              <Link href={"/management"}>
                <a>홈</a>
              </Link>
            </li>
            <li className="mx-auto px-[16px] text-sm">
              <Link href={"/management/driver"}>
                <a>기사 배정</a>
              </Link>
            </li>
            <li className="mx-auto px-[16px] text-sm border-solid border-b-blue-500 border-b-4 h-full flex flex-col justify-center">
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
              <li className="">홈</li>
            </a>
          </Link>
          <Link href={"/management/driver"}>
            <a>
              <li>기사 배정</li>
            </a>
          </Link>
          <Link href={"/management/organization"}>
            <a>
              <li className="border-solid border-r-blue-500 border-r-4">
                기관 코드
              </li>
            </a>
          </Link>
        </ul>
      </SideNav>
      <Container className="overflow-y-scroll block" ref={userBox}>
        <div className="lg:px-[48px] lg:max-w-[1120px] max-w-[840px] px-[24px] mx-auto h-full flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h2>기관 코드를 생성하러면 밑에 버튼을 눌러주세요.</h2>
            <div className="mt-[12px]">
              <FilledButton text="생성" handleOnclick={getOrgCode} />
            </div>
            {orgCode.join_code && (
              <div className="mt-[20px] flex flex-col items-center">
                <QRCodeSVG value={orgCode.join_code} />

                <p className="mt-[12px]">{`해당 코드는 ${orgCode.expires_at}까지 사용가능합니다.`}</p>
              </div>
            )}
          </div>
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
