import Image from "next/image";
import { useState } from "react";
import SmallMenuModal from "../Modal/SmallMenuModal";

interface RouteBoxProps {
  routeId: string;
  startStation: string;
  destStation: string;
  direction: number;
  onClickFunction: Function;
  index: number;
  sliderHandler: Function;
  handleSelected: (name: string) => void;
}

export default function RouteBox({
  routeId,
  startStation,
  destStation,
  direction,
  onClickFunction,
  index,
  sliderHandler,
  handleSelected,
}: RouteBoxProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full h-[200px] rounded-xl shadow-md">
      <div className=" flex flex-row w-full bg-[#FFE6AA] rounded-t-xl px-5 py-2 justify-center items-center">
        <h1 className="font-semibold text-xl">{index}번 노선</h1>
        <button className="absolute flex right-4">
          <Image
            src={"/menu.svg"}
            width={24}
            height={24}
            onClick={() => setModalOpen(!modalOpen)}
          />
          <SmallMenuModal isOpen={modalOpen}>
            <div className="w-full flex flex-col">
              <button className="font-semibold">편집하기</button>
              <button className="font-semibold text-red-600">삭제하기</button>
            </div>
          </SmallMenuModal>
        </button>
      </div>
      <div
        className="flex flex-col w-full h-full justify-around cursor-pointer px-5"
        onClick={() => onClickFunction(routeId, direction)}
      >
        <div>
          <h2>출발: {direction ? destStation : startStation}</h2>
          <h2>종착: {direction ? startStation : destStation}</h2>
        </div>
      </div>

      <div className="flex flex-col w-full h-[50px] justify-center items-center pb-2">
        <div className="flex">
          <Image
            className="cursor-pointer"
            src={"/information.svg"}
            width={44}
            height={44}
            onClick={() => {
              sliderHandler(true);
              handleSelected(`${index}번 노선`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
