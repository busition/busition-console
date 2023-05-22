import styled from "styled-components";

interface ScheduleBoxProps {
  routeId: string;
  startStation: string;
  destStation: string;
  direction: number;
  onClickFunction: Function;
  index: number;
  schedule: {
    day_time: {
      M: {
        day_of_week: {
          S: string;
        };
        time: {
          S: string;
        };
      };
    };
  };
}

export default function ScheduleBox({
  routeId,
  startStation,
  destStation,
  direction,
  onClickFunction,
  schedule,
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

  const setTime2String = (schedule: {
    day_time: {
      M: {
        day_of_week: {
          S: string;
        };
        time: {
          S: string;
        };
      };
    };
  }) => {
    let str = korDayList[engDayList.indexOf(schedule.day_time.M.day_of_week.S)];
    var date = new Date(`2023-05-22${schedule.day_time.M.time.S}`);

    // 시각 추출
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // 오전/오후 여부 판단
    var period = hours >= 12 ? "오후" : "오전";

    // 12시간 형식으로 변환
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시일 경우 12로 표시

    str += " " + period + " " + hours + "시" + minutes + "분";
    return str;
  };

  return (
    <div
      className="w-full h-[200px] bg-[#FFE6AA] rounded-xl shadow-md cursor-pointer"
      onClick={() => onClickFunction(routeId, direction)}
    >
      <div className="flex flex-col w-full h-full px-5 py-5 justify-around">
        <h1 className="font-semibold text-xl">{index}번 노선</h1>
        <div>
          <h2>출발: {startStation}</h2>
          <h2>종착: {destStation}</h2>
        </div>
        <h3 className="text-sm">
          일정: &nbsp;
          {schedule.day_time.M && setTime2String(schedule)}
        </h3>
      </div>
    </div>
  );
}
