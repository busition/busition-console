import { useState } from "react";
import Papa from "papaparse";

type FileData = {
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer;
};

interface DragDropZoneProps {
  setTableRows: Function;
  setValues: Function;
}

export default function DragDropZone({
  setTableRows,
  setValues,
}: DragDropZoneProps) {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    Papa.parse(event.dataTransfer.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray: any[] = [];
        const valuesArray: any[] = [];

        // Iterating data to get column name and their values
        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Filtered Column Names
        setTableRows(rowsArray[0]);
        console.log(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        console.log(valuesArray);
      },
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className="border-2 border-dashed border-green-500 text-center w-full h-full flex flex-col justify-center items-center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h1>Upload Files</h1>
      <p>Drag and drop your files here</p>
    </div>
  );
}
