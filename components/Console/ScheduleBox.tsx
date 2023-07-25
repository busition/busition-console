import Image from "next/image";
import React, { Dispatch, useState } from "react";
import styled from "styled-components";
import SmallMenuModal from "../Modal/SmallMenuModal";

interface ScheduleList {
  stationName: string;
  stationOrder: number;
  time: string;
}

interface Props {
  mode?: "edit" | "create" | "";
  scheduleList: ScheduleList[];
  dataIdx: number;
  handleEditMode: (dataIdx: number, mode: "edit" | "create" | "") => void;
}

const ScheduleBox = ({
  mode = "",
  scheduleList,
  dataIdx,
  handleEditMode,
}: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cacheScheduleList, setCacheScheduleList] = useState<ScheduleList[]>([
    ...JSON.parse(JSON.stringify(scheduleList)),
  ]);

  const handleChangeTime = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    cacheScheduleList[idx].time = e.target.value;
    setCacheScheduleList([...cacheScheduleList]);
  };
  const handleChangeStationName = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    cacheScheduleList[idx].stationName = e.target.value;
    setCacheScheduleList([...cacheScheduleList]);
  };

  return (
    <div className="w-full flex flex-col rounded-xl shadow-md">
      <div className="relative flex flex-row w-full bg-[#FFE6AA] rounded-t-xl px-5 py-2 justify-center items-center">
        <h1 className="font-semibold text-xl">1번 스케줄</h1>
        {!mode && (
          <button className="absolute flex right-4">
            <Image
              src={"/menu.svg"}
              width={24}
              height={24}
              onClick={() => setMenuOpen(!menuOpen)}
            />
            <SmallMenuModal isOpen={menuOpen}>
              <div className="w-full flex flex-col">
                <button
                  className="font-semibold"
                  onClick={() => {
                    handleEditMode(dataIdx, "edit");
                    setMenuOpen(false);
                  }}
                >
                  편집하기
                </button>
                <button className="font-semibold text-red-600">삭제하기</button>
              </div>
            </SmallMenuModal>
          </button>
        )}
      </div>
      <div className="w-full flex flex-col">
        {cacheScheduleList.map((schedule, idx) => (
          <div className="w-full flex flex-row justify-between items-center py-4 px-4">
            {mode ? (
              <input
                type={"text"}
                value={schedule.stationName}
                className="w-[100px]"
                onChange={(e) => handleChangeStationName(e, idx)}
              />
            ) : (
              <p className="font-semibold text-md w-[100px]">
                {schedule.stationName}
              </p>
            )}

            {mode ? (
              <input
                type={"time"}
                value={schedule.time}
                onChange={(e) => handleChangeTime(e, idx)}
                className="w-[115px]"
              />
            ) : (
              <p>{schedule.time}</p>
            )}
          </div>
        ))}
      </div>
      {mode && (
        <div className="w-full flex flex-row justify-around items-center py-4">
          <button>저장</button>
          <button
            onClick={() => {
              setCacheScheduleList([...scheduleList]);
              handleEditMode(dataIdx, "");
              console.log(cacheScheduleList);
              console.log(scheduleList);
            }}
          >
            취소
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleBox;
