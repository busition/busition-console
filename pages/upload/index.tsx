import { useState } from "react";
import DragDropZone from "../../components/DragNDrop/DragDropZone";

type FileData = {
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer;
};

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-[24px]">
      <div>
        <h1 className="font-bold">
          Please upload your schedule in CSV format.
        </h1>
      </div>
      <div className="w-[50vw] h-[50vh]">
        <DragDropZone />
      </div>
    </div>
  );
}
