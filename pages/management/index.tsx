import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import UserPageHeader from "../../components/Headers/UserPageHeader";
import ManagementLayout from "../../components/Layout/ManagementLayout";
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
    <ManagementLayout navigation="home">
      <div className="h-[30%] flex flex-col justify-center items-center pt-[24px]">
        <p className="text-2xl font-semibold">
          이승원님, 버지션 사용을 환영합니다.
        </p>
        <p className="mt-5">버지션 관리 페이지 입니다.</p>
      </div>

      <ItemCard />
    </ManagementLayout>
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

export default Home;
