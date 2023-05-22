import styled from "styled-components";

interface TableProps {
  tableRows: any[];
  values: any[];
}

export default function Table({ tableRows, values }: TableProps) {
  return (
    <div className="md:px-[32px] my-8 w-full h-[70vh] overflow-scroll">
      <div className="w-full shadow-lg">
        <table className=" bg-white shadow-sm text-ellipsis ">
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
                  <tr className="" key={idx}>
                    {rows.map((row: any, idx: number) => (
                      <td className=" text-left py-3 px-4" key={idx}>
                        {row}
                      </td>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
