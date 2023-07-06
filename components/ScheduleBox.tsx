import Image from "next/image";

interface ScheduleBoxProps {
  routeId: string;
  startStation: string;
  destStation: string;
  direction: number;
  onClickFunction: Function;
  index: number;
  sliderHandler: Function;
  handleSelected: (name: string) => void;
}

export default function ScheduleBox({
  routeId,
  startStation,
  destStation,
  direction,
  onClickFunction,
  index,
  sliderHandler,
  handleSelected,
}: ScheduleBoxProps) {
  const engDayList: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const korDayList: string[] = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  return (
    <div className="flex flex-col w-full h-[200px] rounded-xl shadow-md py-2">
      <div className="flex flex-col w-full bg-[#FFE6AA] rounded-t-xl px-5 py-2">
        <h1 className="font-semibold text-xl">{index}번 노선</h1>
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
      <div className="flex flex-col w-full h-[50px] justify-center items-center">
        <div className="flex">
          <Image
            className="cursor-pointer"
            src={"/information.png"}
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
