import React, { useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";
import styled from "styled-components";

interface GoogleMapViewerProps {
  center: { lat: number; lng: number };
  markers: { lat: number; lng: number }[];
  zoom?: number;
}

interface RouteRenderProps {
  markers: { lat: number; lng: number }[];
}

const RouteRender = ({ markers }: RouteRenderProps) => {
  return (
    <>
      {markers.map((marker, id) => (
        <MarkerF position={marker} key={id} />
      ))}
      <PolylineF
        path={markers}
        options={{ strokeColor: "red", strokeWeight: 6, strokeOpacity: 0.8 }}
      />
    </>
  );
};

function GoogleMapViewer({ center, markers, zoom = 12 }: GoogleMapViewerProps) {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <GoogleMapContainer>
      <LoadScriptNext googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={zoom}
        >
          <RouteRender markers={markers} />
        </GoogleMap>
      </LoadScriptNext>
    </GoogleMapContainer>
  );
}

export default React.memo(GoogleMapViewer);

const GoogleMapContainer = styled.div`
  width: 100%;
  height: 100%;

  .google-map {
    width: 100%;
    height: 100%;
  }
`;
