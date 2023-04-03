import React, { useState } from "react";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  PolylineF,
  InfoWindowF,
} from "@react-google-maps/api";
import styled from "styled-components";
import { station_data } from "../types/station.dto";

interface GoogleMapViewerProps {
  center: { lat: number; lng: number };
  markers: station_data[];
  path: number[][];
  zoom?: number;
}

interface RouteRenderProps {
  markers: station_data[];
  path: number[][];
}

const RouteRender = ({ markers, path }: RouteRenderProps) => {
  const route_path = path.map((route: number[], id: number) => {
    const data = { lat: route[1], lng: route[0] };
    return data;
  });

  const [activeMarker, setActiveMarker] = useState<number>(-1);

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <>
      {markers.map((marker, id) => (
        <MarkerF
          position={
            new google.maps.LatLng(
              marker.station_latitude,
              marker.station_longitude
            )
          }
          key={id}
          onClick={() => handleActiveMarker(id)}
        >
          {activeMarker === id && (
            <InfoWindowF
              onCloseClick={() => handleActiveMarker(-1)}
              position={
                new google.maps.LatLng(
                  marker.station_latitude,
                  marker.station_longitude
                )
              }
            >
              <div>
                <h2>{marker.station_name}</h2>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
      ))}
      <PolylineF
        path={route_path}
        options={{ strokeColor: "red", strokeWeight: 3, strokeOpacity: 0.8 }}
      />
    </>
  );
};

function GoogleMapViewer({
  center,
  markers,
  zoom = 12,
  path,
}: GoogleMapViewerProps) {
  const apiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <GoogleMapContainer>
      <LoadScriptNext googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={zoom}
        >
          <RouteRender markers={markers} path={path} />
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
