import React from "react";
import { GoogleMap, LoadScriptNext, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";
import GoogleMapViewer from "../../components/GoogleMapViewer";

const center = {
  lat: 37.541,
  lng: 126.986,
};

export default function ConsoleHome() {
  return (
    <>
      <div className="w-screen h-screen">
        <GoogleMapViewer
          center={center}
          markers={[
            { lat: 37.541, lng: 126.986 },
            { lat: 37.6, lng: 126.986 },
          ]}
        />
      </div>
    </>
  );
}
