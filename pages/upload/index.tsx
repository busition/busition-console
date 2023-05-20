import { useAuthUser } from "next-firebase-auth";
import { useState } from "react";
import DragDropZone from "../../components/DragNDrop/DragDropZone";

export default function Home() {
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-[24px]">
      <div>
        <h1 className="font-bold">
          Please upload your schedule in CSV format.
        </h1>
      </div>
      <div className="w-[50vw] h-[50vh]">
        <DragDropZone setTableRows={setTableRows} setValues={setValues} />
      </div>
      <div className="md:px-[32px] my-8 w-full h-[50vh] overflow-scroll">
        <div className="rounded border-b border-gray-200 shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white sticky top-0">
              <tr>
                {tableRows &&
                  tableRows.map((item: any, idx: number) => (
                    <th className=" text-left py-3 px-4 uppercase font-semibold text-sm">
                      {item}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {values &&
                values.map((rows: any, idx: number) => {
                  return (
                    <tr>
                      {rows.map((row: any, idx: number) => (
                        <td className=" text-left py-3 px-4">{row}</td>
                      ))}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
