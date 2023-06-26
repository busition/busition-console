import Link from "next/link";

interface buttonProps {
  text: string;
  primary?: boolean;
  link?: string;
  onClick?: Function;
}

export default function Button({
  text,
  primary = false,
  link = "",
  onClick = () => {},
}: buttonProps) {
  return (
    <Link href={link}>
      <div className="flex">
        <div
          className={`items-center px-[24px] py-[8px] md:py-[12px] ${
            primary ? "bg-blue-500" : "bg-white"
          } rounded cursor-pointer border-[1px] ${
            primary ? "" : "border-gray-300"
          }`}
          onClick={() => {
            onClick();
          }}
        >
          <h3 className={`${primary ? "text-white" : "text-blue-500"}`}>
            {text}
          </h3>
        </div>
      </div>
    </Link>
  );
}
