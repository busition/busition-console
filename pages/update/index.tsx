import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";

export default function Update() {
  const dayList = ["일", "월", "화", "수", "목", "금", "토"];

  const [open, setOpen] = useState<boolean>(false);

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
                  <SearchButton onClick={() => setOpen(true)}>
                    <p className="font-[rgb(25, 118, 210)]">찾기</p>
                  </SearchButton>
                </div>
              </TableData>
              <TableData>
                <div className="w-full h-full flex flex-row items-center justify-center gap-2">
                  {dayList.map((item, idx) => (
                    <DayButton key={idx} onClick={() => setOpen(open)}>
                      <p>{item}</p>
                    </DayButton>
                  ))}
                </div>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData colSpan={3} className="text-center">
                <div className="w-full h-full flex flex-row justify-center items-center py-[4px]">
                  <AddButton>
                    <p>스케줄 추가</p>
                  </AddButton>
                </div>
              </TableData>
            </TableRow>
          </tbody>
        </Table>
      </div>
      <Modal isOpen={open} handleCloseModal={() => setOpen(false)}>
        <div></div>
      </Modal>
    </body>
  );
}

const AddButton = styled.button`
  padding: 3px 9px;
  background-color: rgb(25, 118, 210);
  color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
`;

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
