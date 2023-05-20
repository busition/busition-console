import React, { useState } from "react";
import GoogleMapViewer from "../../components/GoogleMapViewer";
import { GetServerSideProps } from "next";
import { station_data } from "../../types/station.dto";
import styled from "styled-components";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

interface ConsoleHomeProps {
  station_data: station_data[];
  path: number[][];
}

const ConsoleHome = ({ station_data, path }: ConsoleHomeProps) => {
  let center = { lat: 0, lng: 0 }; // 지도 중심좌표

  const [scheduleNo, setScheduleNo] = useState<number>(0);

  // 모드 역에 대한 좌표값의 평균을 구한 점을 center로 설정한다.
  for (let i = 0; i < station_data.length; i++) {
    center.lat += station_data[i].station_latitude;
    center.lng += station_data[i].station_longitude;
  }

  let schedule = [path, path, path, path];

  return (
    <>
      <div className="w-screen h-screen relative">
        <GoogleMapViewer
          center={{
            lat: center.lat / station_data.length,
            lng: center.lng / station_data.length,
          }}
          markers={station_data}
          path={schedule[scheduleNo]}
          zoom={13}
        />
        <div className="absolute top-0 left-0 h-screen w-[300px] z-10 bg-white shadow-xl overflow-auto">
          <div className="flex sticky top-0 items-center justify-center w-full bg-blue-500 h-[56px] shadow-md">
            <h1 className="text-white text-center text-lg font-bold">
              SCHEDULE
            </h1>
          </div>
          <div className="flex flex-col gap-[20px] px-[24px] py-[32px]">
            {schedule.map((item, idx) => scheduleBox(idx))}
          </div>
        </div>
        <div className="absolute bottom-[50px] left-1/2 w-[400px] h-[80px] bg-white ml-[-200px] mt-[-40px] rounded-lg shadow-lg"></div>
      </div>
    </>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async () => {
  const { station_data, path } = await await fetch(
    process.env.NEXT_PUBLIC_BUSITION_API
  ).then((res) => res.json());
  return {
    props: { station_data, path },
  };
});

export default withAuthUser<ConsoleHomeProps>()(ConsoleHome);

const scheduleBox = (idx: number) => {
  return (
    <div className="w-full h-[200px] bg-[#FFE6AA] rounded-xl shadow-md cursor-pointer"></div>
  );
};
