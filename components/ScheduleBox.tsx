interface ScheduleBoxProps {
  routeId: string;
  startStation: string;
  destStation: string;
  direction: number;
  onClickFunction: Function;
  index: number;
}

export default function ScheduleBox({
  routeId,
  startStation,
  destStation,
  direction,
  onClickFunction,
  index,
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
    <div
      className="w-full h-[200px] bg-[#FFE6AA] rounded-xl shadow-md cursor-pointer"
      onClick={() => onClickFunction(routeId, direction)}
    >
      <div className="flex flex-col w-full h-full px-5 py-5 justify-around">
        <h1 className="font-semibold text-xl">{index}번 노선</h1>
        <div>
          <h2>출발: {direction ? destStation : startStation}</h2>
          <h2>종착: {direction ? startStation : destStation}</h2>
        </div>
        <h3 className="text-sm">일정: 월요일 오전 9시</h3>
      </div>
    </div>
  );
}
