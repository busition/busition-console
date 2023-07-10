import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import SmallMenuModal from "../Modal/SmallMenuModal";

interface schedule {
  stationName: string;
  time: string;
}

const ScheduleBox = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scheduleList: schedule[] = [
    {
      stationName: "국민대학교",
      time: "01:00",
    },
    {
      stationName: "청덕초등학교",
      time: "02:00",
    },
    {
      stationName: "고대부고",
      time: "03:00",
    },
    {
      stationName: "봉국사",
      time: "04:00",
    },
  ];
  return (
    <div className="w-full flex flex-col rounded-xl shadow-md">
      <div className="relative flex flex-row w-full bg-[#FFE6AA] rounded-t-xl px-5 py-2 justify-center items-center">
        <h1 className="font-semibold text-xl">1번 스케줄</h1>
        <button className="absolute flex right-4">
          <Image
            src={"/menu.svg"}
            width={24}
            height={24}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <SmallMenuModal isOpen={menuOpen}>
            <div className="w-full flex flex-col">
              <button className="font-semibold">편집하기</button>
              <button className="font-semibold text-red-600">삭제하기</button>
            </div>
          </SmallMenuModal>
        </button>
      </div>
      <div className="w-full flex flex-col">
        {scheduleList.map((schedule) => (
          <div className="w-full flex flex-row justify-between items-center py-4 px-5">
            <h2>
              {schedule.stationName}
            </h2>
            <VerticalLine />
            <h2>
              {schedule.time}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

const VerticalLine = styled.div`
  border: 0.5px solid black;
  width: 1px;
  height: 10px;
`;

export default ScheduleBox;
