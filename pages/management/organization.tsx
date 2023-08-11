import { getCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import FilledButton from "../../components/Button/FilledButton";
import ManagementLayout from "../../components/Layout/ManagementLayout";
import ModalBox from "../../components/Modal/ModalBox";
import { convertToISO8601, isExpired } from "../../utils/functions";

interface orgCodeType {
  join_code: string;
  generated_at: string;
  expired_at: string;
}

const Home = ({ join_code, generated_at, expired_at }: orgCodeType) => {
  console.log(expired_at);
  const [orgCode, setOrgCode] = useState<orgCodeType>({
    join_code,
    generated_at,
    expired_at,
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [genDate, setGenDate] = useState<string>("");

  const generateOrgCode = async () => {
    // console.log(JSON.stringify({ expired_at: convertToISO8601(genDate) }));
    await fetch(
      `/api/organizations/join-code${
        genDate ? `?expired_at=${convertToISO8601(genDate)}&` : "?"
      }force_recreate=true&auth_type=Email`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrgCode({
          join_code: data.join_code,
          expired_at: data.expired_at,
          generated_at: data.generated_at,
        });
        setModalOpen(false);
      });
  };

  return (
    <ManagementLayout navigation="org">
      <div className="flex flex-col items-center">
        <div className="h-[30%] flex flex-col justify-center items-center pt-[24px]">
          <p className="text-2xl font-semibold">
            버지션 기관 코드 관리 페이지 입니다.
          </p>
          <p className="mt-5">
            여기서 기관 코드를 확인할 수 있으며, 만료되었을 시 기관코드를
            재생성할 수 있습니다.
          </p>
        </div>
        <div className="mt-[12px]">
          <FilledButton text="생성" handleOnclick={() => setModalOpen(true)} />
        </div>
        {orgCode.join_code && (
          <div className="mt-[20px] flex flex-col items-center">
            <QRCodeSVG value={orgCode.join_code} />

            <p className="mt-[12px]">{`해당 코드는 ${orgCode.expired_at}까지 사용가능합니다.`}</p>
          </div>
        )}
      </div>
      {modalOpen && (
        <ModalBox>
          <div className="h-full w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-[8px] w-full h-full">
              <label htmlFor="date">
                만료 날짜를 선택해주세요.(날짜를 공백으로 두면 만료기한이 없는
                코드가 생성됩니다.)
              </label>
              <input
                type="date"
                id="date"
                value={genDate}
                onChange={(e) => setGenDate(e.target.value)}
              />
              <FilledButton text="생성하기" handleOnclick={generateOrgCode} />
            </div>
            <div className="w-full flex felx-row justify-end">
              <Button text="닫기" onClick={() => setModalOpen(false)} />
            </div>
          </div>
        </ModalBox>
      )}
    </ManagementLayout>
  );
};

export const getServerSideProps: GetServerSideProps<orgCodeType> = async ({
  req,
  res,
}) => {
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
  const token = getCookie("token", { req, res });
  const { join_code, expired_at, generated_at }: orgCodeType = await fetch(
    "https://api.dev2.busition.com/latest/organizations/join-code?auth_type=Email",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      return {
        join_code: null,
        expired_at: null,
        generated_at: null,
      };
    });

  return {
    props: { join_code, expired_at, generated_at },
  };
};

export default Home;
