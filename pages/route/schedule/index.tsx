import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../../components/Modal/Modal";
import { GetServerSideProps } from "next";

interface ScheduleProps {
  scheduleList: {
    stationName: string;
  }[];
}

interface TableItem {
  id: number;
  stationName: string;
  latlng: number[];
}

let idx = 0;

const Schedule = ({ scheduleList }: ScheduleProps) => {
  const dayList = ["월", "화", "수", "목", "금", "토", "일"];
  const timeList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const timeStateList = ["AM", "PM"];
  let minList = [];
  for (let i = 0; i < 60; i++) {
    minList.push(i.toString().padStart(2, "0"));
  }

  const [open, setOpen] = useState<boolean>(false);
  const [scheduleState, setScheduleState] = useState({
    day: [""],
    scheduleList: scheduleList.map((scheduleItem) => {
      return {
        stationName: scheduleItem.stationName,
        t: "",
        m: "",
        state: "",
      };
    }),
  });
  const [selectedStation, setSelectedStation] = useState(-1);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center px-20 py-20 gap-8">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <p>요일을 선택해 주세요.</p>
        <div className="w-full flex flex-row justify-center items-center gap-2">
          {dayList.map((day) => (
            <BasicButton
              onClick={() => {
                if (scheduleState.day.includes(day)) {
                  setScheduleState({
                    ...scheduleState,
                    day: scheduleState.day.filter((it) => it != day),
                  });
                } else {
                  setScheduleState({
                    ...scheduleState,
                    day: [...scheduleState.day, day],
                  });
                }
              }}
              clicked={scheduleState.day.includes(day)}
            >
              {day}
            </BasicButton>
          ))}
        </div>
      </div>
      <div className="flex flex-col max-h-full w-full overflow-y-scroll">
        <Table className="w-full rounded-md">
          <thead>
            <TableHeadRow>
              <TableHead>정류장 이름</TableHead>
              <TableHead>시각</TableHead>
            </TableHeadRow>
          </thead>
          <tbody>
            {scheduleState.scheduleList.map((item, idx) => (
              <TableRow className="odd:bg-white even:bg-slate-50" key={idx}>
                <TableData>
                  <div className="flex flex-row w-full h-full justify-center items-center">
                    <p>{item.stationName}</p>
                  </div>
                </TableData>
                <TableData>
                  <div className="w-full h-full flex flex-row justify-center items-center gap-2">
                    <p>
                      {scheduleState.scheduleList[idx].t &&
                        scheduleState.scheduleList[idx].m &&
                        scheduleState.scheduleList[idx].state &&
                        `${scheduleState.scheduleList[idx].t}:${scheduleState.scheduleList[idx].m} ${scheduleState.scheduleList[idx].state}`}
                    </p>
                    <BasicButton
                      onClick={() => {
                        setOpen(true);
                        setSelectedStation(idx);
                      }}
                    >
                      선택
                    </BasicButton>
                  </div>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal isOpen={open} handleCloseModal={() => setOpen(false)}>
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[70%] h-[40vh] flex flex-row justify-center items-center border-b-2 border-[rgba(0, 0, 0, 0.12)] overflow-y-scorll">
            <div className="w-[33%] h-full flex flex-col overflow-y-scroll px-1">
              {timeList.map((time) => (
                <TimeButton
                  onClick={() => {
                    scheduleState.scheduleList[selectedStation].t = time
                      .toString()
                      .padStart(2, "0");
                    setScheduleState({ ...scheduleState });
                  }}
                  clicked={
                    selectedStation != -1 &&
                    scheduleState.scheduleList[selectedStation].t ==
                      time.toString().padStart(2, "0")
                  }
                >
                  {time.toString().padStart(2, "0")}
                </TimeButton>
              ))}
            </div>
            <div className="w-[33%] max-h-full flex flex-col overflow-y-scroll border-r-2 border-l-2 border-[rgba(0, 0, 0, 0.12)] px-1">
              {minList.map((min) => (
                <TimeButton
                  clicked={
                    selectedStation != -1 &&
                    scheduleState.scheduleList[selectedStation].m == min
                  }
                  onClick={() => {
                    scheduleState.scheduleList[selectedStation].m = min;
                    setScheduleState({ ...scheduleState });
                  }}
                >
                  {min}
                </TimeButton>
              ))}
            </div>
            <div className="w-[33%] h-full flex flex-col px-1">
              {timeStateList.map((item) => (
                <TimeButton
                  clicked={
                    selectedStation != -1 &&
                    scheduleState.scheduleList[selectedStation].state == item
                  }
                  onClick={() => {
                    scheduleState.scheduleList[selectedStation].state = item;
                    setScheduleState({ ...scheduleState });
                  }}
                >
                  {item}
                </TimeButton>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
const AddButton = styled.button`
  padding: 3px 9px;
  background-color: rgb(25, 118, 210);
  color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;

const TimeButton = styled.button<{ clicked?: boolean }>`
  padding: 8px 8px;
  color: ${(props) => (props.clicked ? "white" : "black")};
  background-color: ${(props) =>
    props.clicked ? "rgb(59 130 246 / var(--tw-bg-opacity))" : "white"};
`;

const BasicButton = styled.button<{ clicked?: boolean }>`
  border: solid 1px rgba(25, 118, 210, 0.5);
  padding: 3px 9px;
  color: ${(props) => (props.clicked ? "white" : "rgb(25, 118, 210)")};
  border-radius: 4px;
  ${(props) => props.clicked && "background-color: rgb(25, 118, 210)"};
  ${(props) =>
    props.clicked &&
    "box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"};
`;
const Table = styled.table`
  /* border: solid 2px rgb(224, 224, 224); */
  border-collapse: collapse;
`;

const TableHeadRow = styled.tr`
  /* border: solid 2px rgb(224, 224, 224); */
  background-color: rgb(59 130 246);
  color: white;
`;

const TableHead = styled.th`
  /* border: solid 2px rgb(224, 224, 224); */
`;

const TableRow = styled.tr`
  border-bottom: solid 2px rgb(224, 224, 224);
`;

const TableData = styled.td`
  padding: 8px 0;
`;

export const getServerSideProps: GetServerSideProps = async () => {
  const data: ScheduleProps = {
    scheduleList: [
      {
        stationName: "국민대학교",
      },
      {
        stationName: "청덕초등학교",
      },
      {
        stationName: "고대부고",
      },
      {
        stationName: "봉국사",
      },
    ],
  };

  return {
    props: data,
  };
};

export default Schedule;
