import React, { useEffect, useState } from "react";
import { StationDataType } from "../../types/station.dto";
import RouteBox from "../../components/Console/RouteBox";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import ScheduleBox from "../../components/Console/ScheduleBox";
import FilledButton from "../../components/Button/FilledButton";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import RouteRenderer from "../../components/RouterRenderer";
import { GetServerSideProps } from "next";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";

interface ConsoleHomeProps {
  socket: Socket;
  schedule_count: number;
  schedule_data: {
    route_uuid: string;
    departure_point: string;
    destination: string;
    shuttle_direction: number;
  }[];
}

interface RouteType {
  path: number[][];
  path_count: number;
  station_count: number;
  total_passenger_count: number;
  station_data: StationDataType[];
}

interface SocketData {
  location: number[];
  delayed: number;
  speed: number;
}

interface ScheduleList {
  stationName: string;
  stationOrder: number;
  time: string;
}

interface ScheduleData {
  day: string[];
  scheduleId: number;
  editMode: "edit" | "create" | "";
  schedule: ScheduleList[];
}

let socket = io("https://socket.dev2.busition.com/test", {
  transports: ["websocket"],
  autoConnect: true,
}).connect();

const Slider = ({
  open,
  selectedRoute,
  handleOpen,
}: {
  open: boolean;
  selectedRoute: string;
  handleOpen: (state: boolean) => void;
}) => {
  const [pos, setPos] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
  const [isInputedData, setIsInputedData] = useState(false);

  const dayList = ["월", "화", "수", "목", "금", "토", "일"];
  const [scheduleData, setScheduleData] = useState<ScheduleData[]>([
    {
      day: selectedDay,
      scheduleId: 1,
      editMode: "",
      schedule: [
        {
          stationName: "국민대학교",
          time: "01:00",
          stationOrder: 0,
        },
        {
          stationName: "청덕초등학교",
          time: "02:00",
          stationOrder: 1,
        },
        {
          stationName: "고대부고",
          time: "03:00",
          stationOrder: 2,
        },
        {
          stationName: "봉국사",
          time: "04:00",
          stationOrder: 3,
        },
      ],
    },
  ]);

  const handleEditMode = (dataIdx: number, mode: "edit" | "create" | "") => {
    scheduleData[dataIdx].editMode = mode;
    setScheduleData([...scheduleData]);
  };

  return (
    <div
      className={`w-[300px] h-screen absolute top-0 ${
        open ? "left-[330px]" : "left-[0]"
      } shadow-md bg-white transition-all z-10 ease-out overflow-auto`}
    >
      <div className="sticky w-full top-0 h-[56px] shadow-md z-10">
        <div className="flex flex-row w-full h-full justify-center items-center bg-[#FFE6AA]">
          <h1 className="text-black text-center text-lg font-bold">
            {selectedRoute}
          </h1>
          <button
            className="flex absolute right-4"
            onClick={() => handleOpen(false)}
          >
            <Image src={"/back.svg"} width={24} height={24} />
          </button>
        </div>
      </div>
      <div className="sticky w-full top-[56px] h-[56px] flex flex-row justify-around items-center bg-white z-10">
        {dayList.map((item) => (
          <DayButton
            className="cursor-default"
            clicked={selectedDay.includes(item)}
          >
            {item}
          </DayButton>
        ))}
      </div>
      {isInputedData ? (
        <div className="w-full flex flex-col py-[24px] px-[24px] gap-[20px] z-0 justify-start items-center">
          {scheduleData.map((schedule, idx) => (
            <ScheduleBox
              scheduleList={schedule.schedule}
              dataIdx={idx}
              mode={schedule.editMode}
              handleEditMode={handleEditMode}
            />
          ))}
          <PlusButton className="shadow-md mt-5" onClick={() => {}}>
            <Image src={"/plus-white.svg"} width={100} height={100} />
          </PlusButton>
        </div>
      ) : (
        <div className="w-full flex flex-col py-[24px] px-[16px] gap-[20px] z-0">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <p className="text-center">현재 추가된 스케줄이 없습니다.</p>
            <p className="text-center">
              운행 날짜를 선택하시면 스케줄을 추가하실 수 있습니다.
            </p>
            <div className="w-full flex flex-row justify-around items-center mt-[16px]">
              {dayList.map((day) => {
                if (selectedDay.includes(day)) {
                  return (
                    <FilledButton
                      text={day}
                      size="s"
                      handleOnclick={() =>
                        setSelectedDay(selectedDay.filter((it) => it != day))
                      }
                    />
                  );
                } else {
                  return (
                    <BasicButton
                      onClick={() => setSelectedDay([...selectedDay, day])}
                    >
                      {day}
                    </BasicButton>
                  );
                }
              })}
            </div>
            <div className="mt-[12px]">
              <FilledButton
                text="저장"
                size="s"
                handleOnclick={() => setIsInputedData(true)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ConsoleHome = ({ schedule_count, schedule_data }: ConsoleHomeProps) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [path, setPath] = useState<number[][]>([]);
  const [stationData, setStationData] = useState<StationDataType[]>([]);
  const router = useRouter();
  const [socketData, setSocketData] = useState<SocketData>();
  const [openSlider, setOpenSlider] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 37,
    lng: 127,
  });

  const testRoute = async () => {
    socket.emit("test console", "0");
    socket.on(
      "data",
      (data: {
        location: number[];
        delayed: number;
        speed: number;
        stationName: string;
      }) => {
        setSocketData({
          speed: data.speed,
          location: data.location,
          delayed: data.delayed,
        });
        setCenter({ lat: data.location[0], lng: data.location[1] });
      }
    );
  };

  /**
   * 라우트 id를 통해서 노선의 경로를 받아오며, 소켓과 연결을 시도함
   * @param route_id
   * @param shuttle_direction
   */
  const getRoute = async (route_id: string, shuttle_direction: number) => {
    const token = getCookie("token");
    const {
      path,
      path_count,
      station_count,
      station_data,
      total_passenger_count,
    }: RouteType = await fetch(`/api/routes/2`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }).then(async (res) => res.json());
    socket.emit("test console", JSON.stringify({ bearer: token }));
    socket.on(
      "data",
      (data: {
        location: number[];
        delayed: number;
        speed: number;
        stationName: string;
      }) => {
        setSocketData({
          speed: data.speed,
          location: data.location,
          delayed: data.delayed,
        });
      }
    );
    setPath(path);
    setStationData(station_data);
    let lat = 0;
    let lng = 0;
    for (let i = 0; i < path.length; i++) {
      lat += path[i][1];
      lng += path[i][0];
    }
    setCenter({ lat: lat / path_count, lng: lng / path_count });
  };

  useEffect(() => {
    socket.connect();
    return () => {
      if (socket !== null && socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div className="relative">
      <GridContainer className="">
        <div className=" h-screen bg-white shadow-xl overflow-auto z-50">
          <div className="flex sticky top-0 items-center justify-around w-full bg-blue-500 h-[56px] shadow-md z-50">
            <div className="h-full flex">
              <Image
                src={"/icon/homeIcon.svg"}
                width={32}
                height={32}
                onClick={() => router.push("/")}
                className="cursor-pointer invert"
              />
            </div>
            <h1 className="text-white text-center text-lg font-bold">
              SCHEDULE
            </h1>
            <div className="h-full flex justify-center">
              <Image
                className="cursor-pointer"
                src={"/logout.svg"}
                width={28}
                height={28}
                onClick={async () => {
                  deleteCookie("token");
                  router.reload();
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-[20px] px-[24px] py-[32px] justify-center items-center">
            {schedule_data.map((item, idx) => (
              <RouteBox
                routeId={item.route_uuid}
                destStation={item.destination}
                startStation={item.departure_point}
                direction={item.shuttle_direction}
                onClickFunction={getRoute}
                key={idx}
                index={idx + 1}
                sliderHandler={setOpenSlider}
                handleSelected={setSelectedRoute}
              />
            ))}
            <RouteBox
              routeId={"1"}
              destStation={"test"}
              startStation={"test"}
              direction={1}
              onClickFunction={testRoute}
              index={-1}
              sliderHandler={setOpenSlider}
              handleSelected={setSelectedRoute}
            />
            <Link href={"/route"}>
              <a>
                <PlusButton className="shadow-md mt-5">
                  <Image src={"/plus-white.svg"} width={100} height={100} />
                </PlusButton>
              </a>
            </Link>
          </div>
        </div>
        <div className="relative z-0 w-full h-full">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              center={center}
              zoom={12}
              mapContainerStyle={{ height: "100%", width: "100%" }}
            >
              <RouteRenderer
                markers={stationData}
                path={path}
                nowBusPos={socketData}
              />
            </GoogleMap>
          </LoadScript>
          {/* <div className="absolute bottom-[50px] left-1/2 w-[400px] h-[80px] bg-white ml-[-200px] mt-[-40px] rounded-lg shadow-lg" /> */}
        </div>
        <Slider
          open={openSlider}
          selectedRoute={selectedRoute}
          handleOpen={setOpenSlider}
        />
      </GridContainer>
    </div>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 330px 1fr;
  width: 100%;
  height: 100%;
  position: relative;
`;

const PlusButton = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-color: #ffe6aa;
`;

const BasicButton = styled.button`
  border: solid 1px rgba(25, 118, 210, 0.5);
  padding: 4px 10px;
  color: rgb(25, 118, 210);
  border-radius: 4px;
`;

const DayButton = styled.button<{ clicked: boolean }>`
  border-bottom: solid 1px ${(props) => (props.clicked ? "black" : "#d8d8df")};
  color: ${(props) => (props.clicked ? "black" : "#d8d8df")};
  padding: 3px 9px;
  height: 56px;
`;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!hasCookie("token", { req, res })) {
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
  const { schedule_count, schedule_data } = await fetch(
    "https://api.dev2.busition.com/latest/schedules/consoles",
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

  return {
    props: { schedule_count, schedule_data },
  };
};

export default ConsoleHome;
