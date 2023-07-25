import { deleteCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import UserPageHeader from "../../components/Headers/UserPageHeader";

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
  useEffect(() => {
    /**
     * 핸들 스크롤 함수
     */
    const handleScroll = () => {
      if (window !== undefined) {
        // 스크롤 감지
        if (window.scrollY == 0) {
          setIsScroll(false);
        } else {
          setIsScroll(true);
        }
      }
    };

    if (window !== undefined) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isScroll, setIsScroll] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="h-screen w-screen">
      <UserPageHeader
        isScroll={isScroll}
        handleClick={() => {
          deleteCookie("token");
          router.reload();
        }}
      />
      <Container>
        <div className="w-full h-[30%] flex flex-col justify-center items-center">
          <p className="text-2xl font-semibold">
            이승원님, 버지션 사용을 환영합니다.
          </p>
          <p className="mt-5">
            이 페이지에서 노선 및 관련 정보를 확인할 수 있습니다.
          </p>
        </div>
        <div className="w-full h-full px-[256px]">
          <ItemCard />
        </div>
      </Container>
    </div>
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
  }
  return {
    props: {},
  };
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default userPage;
