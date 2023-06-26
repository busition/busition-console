import styled from "styled-components";
import Button from "../../components/Button/Button";

export default function Update() {
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <body className="h-screen w-screen">
      <div className="flex flex-col h-full w-full justify-center items-center px-20 py-20">
        <Table className="w-full rounded-md">
          <thead>
            <TableHeadRow>
              <TableHead>정류장 이름</TableHead>
              <TableHead>위치</TableHead>
              <TableHead>스케쥴</TableHead>
            </TableHeadRow>
          </thead>
          <tbody>
            <TableRow className="odd:bg-white even:bg-slate-50">
              <TableData>
                <div className="flex flex-row w-full h-full justify-center items-center">
                  <input className="border-solid border rounded" type="text" />
                </div>
              </TableData>
              <TableData>
                <div className="w-full h-full flex flex-row justify-center items-center">
                  <SearchButton>
                    <h3 className="font-[rgb(25, 118, 210)]">검색</h3>
                  </SearchButton>
                </div>
              </TableData>
              <TableData>
                <div className="w-full h-full flex flex-row items-center justify-center gap-2">
                  {dayList.map((item, idx) => (
                    <DayButton key={idx}>
                      <h3>{item}</h3>
                    </DayButton>
                  ))}
                </div>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData colSpan={3} className="text-center">
                <p className="font-bold">Add schedule</p>
              </TableData>
            </TableRow>
          </tbody>
        </Table>
      </div>
    </body>
  );
}

const DayButton = styled.button`
  border: solid 1px rgba(25, 118, 210, 0.5);
  padding: 3px 9px;
  color: rgb(25, 118, 210);
  border-radius: 4px;
`;

const SearchButton = styled.button`
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
