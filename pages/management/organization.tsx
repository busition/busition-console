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
import ManagementLayout from "../../components/Layout/ManagementLayout";
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
    <ManagementLayout navigation="org">
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
