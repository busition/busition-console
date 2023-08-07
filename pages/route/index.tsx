import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/Modal/Modal";
import Geocode from "react-geocode";
import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { ReactSortable } from "react-sortablejs";
import Button from "../../components/Button/Button";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";

interface TableItem {
  id: number;
  stationName: string;
  latlng: number[];
}

interface routeType {
  name: string;
  description: string;
  shuttle_direction: number;
  day_of_week: number[];
}

interface stationType {}

let idx = 0;

const Route = () => {
  // useState 변수들
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<TableItem[]>([
    { id: idx, stationName: "", latlng: [] },
  ]);
  const [selectedStation, setSelectedStation] = useState(-1);
  const [pos, setPos] = useState<{
    lat: number | undefined;
    lng: number | undefined;
  }>({ lat: undefined, lng: undefined });
  const [activeMarker, setActiveMarker] = useState(-1);
  const router = useRouter();
  const [routeName, setRouteName] = useState<string>("");

  // api 관련 함수
  const sendRoute = async () => {
    const data = await fetch("/api/route/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify([
        {
          name: routeName,
          description: "",
          shuttle_direction: 0,
          day_of_week: [],
        },
      ]),
    }).then((res) => res.json());
    console.log(data);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-1/2 rounded shadow-md">
          <LoadScriptNext
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={{ height: "100%", width: "100%" }}
              center={{
                lat: 37.55,
                lng: 127,
              }}
              zoom={12}
            >
              {state
                .filter((it) => it.latlng.length !== 0)
                .map((it) => (
                  <MarkerF
                    position={{ lat: it.latlng[0], lng: it.latlng[1] }}
                    onClick={() => setActiveMarker(it.id)}
                  >
                    {it.id == activeMarker && (
                      <InfoWindowF
                        position={{ lat: it.latlng[0], lng: it.latlng[1] }}
                        onCloseClick={() => setActiveMarker(-1)}
                      >
                        <div className="">
                          <p>{it.stationName}</p>
                        </div>
                      </InfoWindowF>
                    )}
                  </MarkerF>
                ))}
            </GoogleMap>
          </LoadScriptNext>
        </div>
        <div
          className="flex flex-col h-1/2
       w-full px-20 py-20 overflow-y-scroll"
        >
          <div className="w-full flex flex-row justify-center items-center gap-[12px] my-[20px]">
            <label className="" htmlFor="name">
              노선 이름
            </label>
            <input
              className="border-solid border rounded text-end"
              type="text"
              value={routeName}
              onChange={(e) => setRouteName(e.target.value)}
              id="name"
            />
          </div>
          <Table className="w-full rounded-md">
            <thead>
              <TableHeadRow>
                <TableHead>정류장 이름</TableHead>
                <TableHead>위치</TableHead>
                <TableHead>삭제</TableHead>
              </TableHeadRow>
            </thead>
            <ReactSortable tag={"tbody"} list={state} setList={setState}>
              {state.map((item) => (
                <TableRow
                  className="odd:bg-white even:bg-slate-50"
                  key={item.id}
                >
                  <TableData>
                    <div className="flex flex-row w-full h-full justify-center items-center">
                      <input
                        className="border-solid border rounded text-end"
                        type="text"
                        value={item.stationName}
                        onChange={(e) =>
                          setState(
                            state.map((it) => {
                              if (it.id == item.id) {
                                item.stationName = e.target.value;
                              }
                              return it;
                            })
                          )
                        }
                      />
                    </div>
                  </TableData>
                  <TableData>
                    <div className="w-full h-full flex flex-row justify-center items-center">
                      <BasicButton
                        onClick={() => {
                          setOpen(true);
                          setPos({ lat: undefined, lng: undefined });
                          setSelectedStation(item.id);
                        }}
                      >
                        <p className="font-[rgb(25, 118, 210)]">찾기</p>
                      </BasicButton>
                    </div>
                  </TableData>
                  <TableData>
                    <div className="w-full h-full flex flex-row justify-center items-center">
                      <BasicButton
                        onClick={(e) =>
                          setState(state.filter((it) => it.id != item.id))
                        }
                      >
                        삭제
                      </BasicButton>
                    </div>
                  </TableData>
                </TableRow>
              ))}
            </ReactSortable>
            <tbody>
              <TableRow>
                <TableData colSpan={3} className="text-center">
                  <div className="w-full h-full flex flex-row justify-center items-center py-[4px]">
                    <AddButton
                      onClick={async () => {
                        idx++;

                        setState([
                          ...state,
                          {
                            id: idx,
                            stationName: "",
                            latlng: [3755, 127],
                          },
                        ]);
                        console.log(state);
                      }}
                    >
                      <p>노선 추가</p>
                    </AddButton>
                  </div>
                </TableData>
              </TableRow>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="w-full flex flex-row h-[100px] justify-center items-center gap-[12px]">
        <Button text="취소" onClick={() => router.push("/console")} />
        <Button text="저장" primary={true} onClick={() => sendRoute()} />
      </div>
      <Modal
        isOpen={open}
        handleCloseModal={() => setOpen(false)}
        handleSubmit={() => {
          state.forEach((it) => {
            if (it.id == selectedStation && pos.lat && pos.lng) {
              it.latlng = [pos.lat, pos.lng];
            }
          });
          console.log(state);
          setState([...state]);
          setOpen(false);
        }}
      >
        <GeocodeContainer handlePos={setPos} />
      </Modal>
    </div>
  );
};

const GeocodeContainer = ({
  handlePos,
}: {
  handlePos: React.Dispatch<
    React.SetStateAction<{
      lat: number | undefined;
      lng: number | undefined;
    }>
  >;
}) => {
  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_GEOCODING);
  Geocode.setLanguage("kr");
  Geocode.setRegion("kr");
  Geocode.enableDebug();

  const [text, setText] = useState<string>("");
  const [marker, setMarker] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 999, lng: 999 });

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 37.55,
    lng: 127,
  });

  const [zoom, setZoom] = useState(10);

  const getGeocode = async (address: string) => {
    if (address.trim() == "" || false || undefined) {
      return;
    }
    await Geocode.fromAddress(address).then((res) => {
      if (res.status == "OK") {
        const location = res.results[0].geometry.location;
        setMarker(location);
        setCenter(location);
        setZoom(20);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8">
      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          getGeocode(text);
        }}
      >
        <div className="flex w-full flex-row justify-center items-center gap-4">
          <input
            className="border-solid border rounded text-end"
            type="text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
          <BasicButton type="submit">
            <p>검색</p>
          </BasicButton>
        </div>
      </form>

      <div className="w-full h-[80%]">
        <LoadScriptNext
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            zoom={zoom}
            onClick={(e) => {
              setMarker({
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              });
              setCenter({
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              });
              handlePos({
                lat: e.latLng?.lat() as number,
                lng: e.latLng?.lng() as number,
              });
              setZoom(20);
            }}
          >
            {marker.lat != 999 && marker.lng != 999 && (
              <MarkerF position={marker} />
            )}
          </GoogleMap>
        </LoadScriptNext>
      </div>
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

const BasicButton = styled.button`
  border: solid 1px rgba(25, 118, 210, 0.5);
  padding: 3px 9px;
  color: rgb(25, 118, 210);
  border-radius: 4px;
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

export default Route;
