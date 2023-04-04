import React from "react";

import GoogleMapViewer from "../../components/GoogleMapViewer";
import { GetServerSideProps } from "next";
import { station_data } from "../../types/station.dto";

interface ConsoleHomeProps {
  station_data: station_data[];
  path: number[][];
}

export default function ConsoleHome({ station_data, path }: ConsoleHomeProps) {
  let center = { lat: 0, lng: 0 }; // 지도 중심좌표

  // 모드 역에 대한 좌표값의 평균을 구한 점을 center로 설정한다.
  for (let i = 0; i < station_data.length; i++) {
    center.lat += station_data[i].station_latitude;
    center.lng += station_data[i].station_longitude;
  }

  return (
    <>
      <div className="w-screen h-screen">
        <GoogleMapViewer
          center={{
            lat: center.lat / station_data.length,
            lng: center.lng / station_data.length,
          }}
          markers={station_data}
          path={path}
          zoom={13}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { station_data, path } = await await fetch(
    process.env.NEXT_PUBLIC_BUSITION_API
  ).then((res) => res.json());

  return {
    props: { station_data, path },
  };
};
