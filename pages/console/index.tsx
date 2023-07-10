import React, { useEffect, useState } from "react";
import GoogleMapViewer from "../../components/GoogleMapViewer";
// import { socket } from "../../utils/socket";
import { StationDataType } from "../../types/station.dto";
import RouteBox from "../../components/Console/RouteBox";
import styled from "styled-components";
import { io, Socket } from "socket.io-client";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Image from "next/image";
import Link from "next/link";
import firebase from "firebase";
import { useRouter } from "next/router";
import ScheduleBox from "../../components/Console/ScheduleBox";

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

let socket = io("https://socket.dev2.busition.com/test", {
  transports: ["websocket"],
  autoConnect: false,
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
  const [selectedDay, setSelectedDay] = useState("");

  const dayList = ["월", "화", "수", "목", "금", "토", "일"];
  const setDayList = ["월", "수", "금"];
  const scheduleList = [];
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
        <div>
          <h1 className="text-black text-center text-lg font-bold">
            운행 요일:
          </h1>
        </div>
        {
          /* {dayList.map((item) => (
          <DayButton
            clicked={selectedDay == item}
            onClick={() => setSelectedDay(item)}
          >
            {item}
          </DayButton>
        ))} */
        }

        {setDayList.map((item) => (
          <DayButton
            clicked={true}
          >
            {item}
          </DayButton>
        ))}
      </div>
      <div className="w-full flex flex-col py-[24px] px-[28px] gap-[20px] z-0">
        <ScheduleBox />
        <ScheduleBox />
      </div>

      <PlusButton className="shadow-md mt-5">
        <Image src={"/plus-white.svg"} width={100} height={100} />
      </PlusButton>
    </div>
  );
};

const ConsoleHome = ({ schedule_count, schedule_data }: ConsoleHomeProps) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [path, setPath] = useState<number[][]>([]);
  const [statioinData, setStatioinData] = useState<StationDataType[]>([]);
  const AuthUser = useAuthUser();
  const router = useRouter();
  const [socketData, setSocketData] = useState<SocketData>();
  const [openSlider, setOpenSlider] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");

  const getRoute = async (route_id: string, shuttle_direction: number) => {
    const token = await AuthUser.getIdToken();
    const {
      path,
      path_count,
      station_count,
      station_data,
      total_passenger_count,
    }: RouteType = await fetch(`/api/route/1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }).then((res) => {
      console.log(res);
      return res.json();
    });
    socket.emit("test join", JSON.stringify({ bearer: token }));
    socket.on(
      "data",
      (data: {
        location: number[];
        delayed: number;
        speed: number;
        stationName: string;
      }) => {
        console.log(data);
      },
    );
    // setPath(path);
    // setStatioinData(station_data);
    // let lat = 0;
    // let lng = 0;
    // for (let i = 0; i < path.length; i++) {
    //   lat += path[i][1];
    //   lng += path[i][0];
    // }
    // setCenter({ lat: lat / path_count, lng: lng / path_count });
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
          <div className="flex sticky top-0 items-center justify-center w-full bg-blue-500 h-[56px] shadow-md">
            <h1 className="text-white text-center text-lg font-bold">
              SCHEDULE
            </h1>
            <div className="absolute right-[8px] h-full flex justify-center">
              <Image
                className="cursor-pointer"
                src={"/logout.svg"}
                width={28}
                height={28}
                onClick={async () => {
                  await firebase
                    .auth()
                    .signOut()
                    .then(() => router.replace("/"));
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
            <Link href={"/route"}>
              <a>
                <PlusButton className="shadow-md mt-5">
                  <Image src={"/plus-white.svg"} width={100} height={100} />
                </PlusButton>
              </a>
            </Link>
          </div>
        </div>
        <div className="relative z-0">
          <GoogleMapViewer
            center={{
              lat: center.lat,
              lng: center.lng,
            }}
            markers={statioinData}
            path={path}
            zoom={13}
            nowBusPos={socketData && socketData}
          />
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

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();
  const { schedule_count, schedule_data }: ConsoleHomeProps = await fetch(
    "https://api.dev2.busition.com/latest/schedule/console/",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    },
  ).then((res) => res.json());
  return {
    props: { schedule_count, schedule_data },
  };
});

export default withAuthUser<ConsoleHomeProps>()(ConsoleHome);

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
  padding: 3px 9px;
  color: rgb(25, 118, 210);
  border-radius: 4px;
`;

const DayButton = styled.button<{ clicked: boolean }>`
  border-bottom: solid 1px ${(props) => (props.clicked ? "black" : "#d8d8df")};
  color: ${(props) => (props.clicked ? "black" : "#d8d8df")};
  padding: 3px 9px;
  height: 56px;
`;
