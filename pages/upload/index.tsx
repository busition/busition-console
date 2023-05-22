import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import DragDropZone from "../../components/DragNDrop/DragDropZone";
import Table from "../../components/Table";

interface sendForm {
  driver_uid: string;
  passengers_uid: string[];
  shuttle_direction: number;
  station_latitude: number;
  station_longitude: number;
  station_name: string;
  stopping_order: number;
  test: boolean;
}
const Home = () => {
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);
  const AuthUser = useAuthUser();
  const router = useRouter();

  const handleSendEvent = async () => {
    const token = await AuthUser.getIdToken();
    console.log(token);
    let form: sendForm[] = [];
    for (let i = 0; i < values.length; i++) {
      let tmp: any = {};
      for (let j = 0; j < tableRows.length; j++) {
        if (
          tableRows[j] == "boarding_schedule" ||
          tableRows[j] == "passengers_uid" ||
          tableRows[j] == "shuttle_direction" ||
          tableRows[j] == "station_latitude" ||
          tableRows[j] == "station_longitude" ||
          tableRows[j] == "stopping_order"
        ) {
          tmp[tableRows[j]] = JSON.parse(values[i][j]);
        } else if (tableRows[j] == "test") {
          tmp[tableRows[j]] = values[i][j] == "TRUE" ? true : false;
        } else {
          tmp[tableRows[j]] = values[i][j];
        }
      }
      form.push(tmp);
    }
    const res = await fetch("/api/route/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: await JSON.stringify(form),
    }).then((res) => res.status);
    console.log(JSON.stringify(form));
    console.log(res);
    if (res == 200) {
      router.push("/console");
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center gap-[24px]">
      {tableRows.length == 0 ? (
        <>
          <div>
            <h1 className="font-bold">
              Please upload your schedule in CSV format.
            </h1>
          </div>
          <div className="w-[50vw] h-[50vh]">
            <DragDropZone setTableRows={setTableRows} setValues={setValues} />
          </div>
        </>
      ) : (
        <Table tableRows={tableRows} values={values} />
      )}
      {tableRows.length >= 1 && (
        <div className="absolute right-10 bottom-5 flex flex-row gap-3">
          <div onClick={() => setTableRows([])}>
            <Button text="Back" />
          </div>
          <div onClick={handleSendEvent}>
            <Button text="Send" primary={true} />
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Home);
