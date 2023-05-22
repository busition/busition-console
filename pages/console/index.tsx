import React, { useState } from "react";
import GoogleMapViewer from "../../components/GoogleMapViewer";
import { GetServerSideProps } from "next";
import { StationDataType } from "../../types/station.dto";
import ScheduleBox from "../../components/ScheduleBox";
import styled from "styled-components";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Image from "next/image";
import Link from "next/link";

interface ConsoleHomeProps {
  schedule_count: number;
  schedule_data: {
    route_uuid: string;
    departure_point: string;
    destination: string;
    shuttle_direction: number;
    departure_time: {
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
  }[];
}

interface RouteType {
  path: number[][];
  path_count: number;
  station_count: number;
  total_passenger_count: number;
  station_data: StationDataType[];
}

const ConsoleHome = ({ schedule_count, schedule_data }: ConsoleHomeProps) => {
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.5665,
    lng: 126.978,
  });
  const [path, setPath] = useState<number[][]>([]);
  const [statioinData, setStatioinData] = useState<StationDataType[]>([]);
  const AuthUser = useAuthUser();

  const getRoute = async (route_id: string, shuttle_direction: number) => {
    const token = await AuthUser.getIdToken();

    const {
      path,
      path_count,
      station_count,
      station_data,
      total_passenger_count,
    }: RouteType = await fetch(`/api/route/${route_id}/${shuttle_direction}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    }).then((res) => res.json());
    setPath(path);
    setStatioinData(station_data);
    let lat = 0;
    let lng = 0;
    for (let i = 0; i < path.length; i++) {
      lat += path[i][1];
      lng += path[i][0];
    }
    setCenter({ lat: lat / path_count, lng: lng / path_count });
    console.log(path);
  };

  return (
    <GridContainer>
      <div className=" h-screen bg-white shadow-xl overflow-auto">
        <div className="flex sticky top-0 items-center justify-center w-full bg-blue-500 h-[56px] shadow-md">
          <h1 className="text-white text-center text-lg font-bold">SCHEDULE</h1>
        </div>
        <div className="flex flex-col gap-[20px] px-[24px] py-[32px] justify-center items-center">
          {schedule_data.map((item, idx) => (
            <ScheduleBox
              routeId={item.route_uuid}
              destStation={item.destination}
              startStation={item.departure_point}
              direction={item.shuttle_direction}
              onClickFunction={getRoute}
              key={idx}
              schedule={item.departure_time}
              index={idx + 1}
            />
          ))}
          <PlusButton className="shadow-md mt-5">
            <Link href="/upload">
              <a>
                <Image src={"/plus-white.svg"} width={100} height={100} />
              </a>
            </Link>
          </PlusButton>
        </div>
      </div>
      <div className="relative">
        <GoogleMapViewer
          center={{
            lat: center.lat,
            lng: center.lng,
          }}
          markers={statioinData}
          path={path}
          zoom={13}
        />
        {/* <div className="absolute bottom-[50px] left-1/2 w-[400px] h-[80px] bg-white ml-[-200px] mt-[-40px] rounded-lg shadow-lg" /> */}
      </div>
    </GridContainer>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  const token = await AuthUser.getIdToken();
  const { schedule_count, schedule_data }: ConsoleHomeProps = await fetch(
    "http://api.dev.busition.com:8001/latest/schedule/console/",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
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
`;

const PlusButton = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  background-color: #ffe6aa;
`;
