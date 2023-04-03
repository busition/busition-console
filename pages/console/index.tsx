import React from "react";

import GoogleMapViewer from "../../components/GoogleMapViewer";
import { GetServerSideProps } from "next";
import { station_data } from "../../types/station.dto";

interface ConsoleHomeProps {
  station_data: station_data[];
  path: number[][];
}

export default function ConsoleHome({ station_data, path }: ConsoleHomeProps) {
  return (
    <>
      <div className="w-screen h-screen">
        <GoogleMapViewer
          center={{
            lat: station_data[0].station_latitude,
            lng: station_data[0].station_longitude,
          }}
          markers={station_data}
          path={path}
          zoom={18}
        />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { station_data, path } = await await fetch(
    "http://api.dev.busition.com:8001/v1_1/route/1?shuttle_direction=0"
  ).then((res) => res.json());

  return {
    props: { station_data, path },
  };
};
