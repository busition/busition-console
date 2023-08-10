import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import FilledButton from "../../components/Button/FilledButton";
import UserPageHeader from "../../components/Headers/UserPageHeader";
import ManagementLayout from "../../components/Layout/ManagementLayout";
import { isExpired } from "../../utils/functions";

interface itemCardProps {
  routeName: string;
  arrival: string;
  departure: string;
  routeId: number;
}

interface homeProps {
  schedule_data: {
    id: number;
    name: string;
    description: string;
    departure_point: string;
    destination: string;
    day_of_week: number[];
  }[];
}

const ItemCard = ({
  routeName,
  arrival,
  departure,
  routeId,
}: itemCardProps) => {
  return (
    <div className=" block mt-[24px]">
      <div className="px-[24px] py-[24px] rounded-t-lg border-t-2 border-l-2 border-r-2 border-solid">
        <div className="text-lg font-semibold mb-[8px]">{routeName}</div>
        <div className="block text-sm">
          <div>출발 : {departure}</div>
          <div>도착 : {arrival}</div>
        </div>
      </div>
      <div className="border-2 border-solid rounded-b-lg px-[24px] py-[12px] flex flex-row gap-[8px] justify-center items-center">
        현재 배정된 기사 없음
        <FilledButton text="기사 배정" size="m" />
      </div>
    </div>
  );
};

const Home = ({ schedule_data }: homeProps) => {
  console.log(schedule_data);
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
    <ManagementLayout navigation="driver">
      {schedule_data.map((data) => (
        <ItemCard
          routeName={data.name}
          arrival={data.destination}
          departure={data.departure_point}
          routeId={data.id}
        />
      ))}
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
  const token = getCookie("token", { req, res });
  console.log(token);
  const { schedule_data } = await fetch(
    "https://api.dev2.busition.com/latest/schedules/?platform=console&?auth_type=Email",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  ).then(async (response) => {
    return response.json();
  });
  console.log(schedule_data);
  return {
    props: { schedule_data },
  };
};

export default Home;
