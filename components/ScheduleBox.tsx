interface ScheduleBoxProps {
  routeId: string;
  startStation: string;
  destStation: string;
  direction: number;
  onClickFunction: Function;
}

export default function ScheduleBox({
  routeId,
  startStation,
  destStation,
  direction,
  onClickFunction,
}: ScheduleBoxProps) {
  console.log(routeId);
  return (
    <div
      className="w-full h-[200px] bg-[#FFE6AA] rounded-xl shadow-md cursor-pointer"
      onClick={() => onClickFunction(routeId, direction)}
    >
      <h2>{startStation}</h2>
      <h2>{destStation}</h2>
    </div>
  );
}
