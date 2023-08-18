import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import SmallMenuModal from "../Modal/SmallMenuModal";

interface RouteBoxProps {
  routeId: number;
  startStation: string;
  destStation: string;
  direction: number;
  onClickFunction: Function;
  name: string;
  sliderHandler: Function;
  handleSelected: (name: string) => void;
}

export default function RouteBox({
  routeId,
  startStation,
  destStation,
  direction,
  onClickFunction,
  sliderHandler,
  name,
  handleSelected,
}: RouteBoxProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    await fetch(`/api/routes/${routeId}` + "?auth_type=Email", {
      method: "DELETE",
      headers: {
        accpet: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        router.reload();
      });
  };

  console.log(routeId);

  return (
    <div className="flex flex-col w-full h-[200px] rounded-xl shadow-md z-0">
      <div className="relative flex flex-row w-full bg-[#FFE6AA] rounded-t-xl px-5 py-2 justify-center items-center">
        <h1 className="font-semibold text-xl">{name}</h1>
        <button className="absolute flex right-4">
          <Image
            src={"/menu.svg"}
            width={24}
            height={24}
            onClick={() => setModalOpen(!modalOpen)}
          />
          <SmallMenuModal isOpen={modalOpen}>
            <div className="w-full flex flex-col">
              <button
                className="font-semibold"
                onClick={() =>
                  router.push({
                    pathname: "/route",
                    query: {
                      routeId,
                    },
                  })
                }
              >
                편집하기
              </button>

              <button
                className="font-semibold text-red-600"
                onClick={handleDelete}
              >
                삭제하기
              </button>
            </div>
          </SmallMenuModal>
        </button>
      </div>
      <div
        className="flex flex-col w-full h-full justify-around cursor-pointer px-5"
        onClick={() => onClickFunction(routeId, direction)}
      >
        <div>
          <h2>출발: {direction ? destStation : startStation}</h2>
          <h2>종착: {direction ? startStation : destStation}</h2>
        </div>
      </div>
      <div className="flex flex-col w-full h-[50px] justify-center items-center pb-2">
        <div className="flex">
          <Image
            className="cursor-pointer"
            src={"/information.svg"}
            width={44}
            height={44}
            onClick={() => {
              sliderHandler(true);
              handleSelected(`${name}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
