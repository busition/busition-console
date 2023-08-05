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
    <div className="w-full border-2 border-solid rounded-lg flex flex-col px-[24px] py-[24px]">
      <p className="font-semibold text-xl pb-[16px]">버지션 콘솔</p>
      <p>
        버스 위치와 노선 정보를 확인하고 관리할 수 있는 콘솔 창으로 이동합니다.
      </p>
      <div className="w-full flex flex-row justify-end pt-[8px]">
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
    <MainContainer className="overflow-hidden">
      <UserPageHeader
        isScroll={isScroll}
        handleClick={() => {
          deleteCookie("token");
          router.reload();
        }}
      />
      <Container>
        <SideNav>
          <div>홈</div>
          <div>개인 정보</div>
          <div>결제 및 구독</div>
        </SideNav>
        <div
          className="w-full h-full px-[48px] overflow-y-scroll flex flex-col"
          ref={userBox}
        >
          <div className="w-full h-[30%] flex flex-col justify-center items-center">
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
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 280px 1fr;
`;
const SideNav = styled.nav`
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-top: 20px;

  div {
    padding: 10px 0;
    padding-left: 24px;
    padding-right: 16px;
  }
`;

export default userPage;
