import Link from "next/link";

interface buttonProps {
  text: string;
  primary?: boolean;
  link?: string;
  onClick?: () => void;
  submit?: boolean;
}

export default function Button({
  text,
  primary = false,
  link = "",
  onClick = () => {},
  submit = false,
}: buttonProps) {
  return (
    <Link href={link}>
      <button
        className={`flex flex-row items-center px-[24px] py-[8px] md:py-[12px] ${
          primary ? "bg-blue-500" : "bg-white"
        } rounded cursor-pointer border-[1px] ${
          primary ? "" : "border-gray-300"
        }`}
        onClick={() => {
          onClick();
        }}
        type={submit ? "submit" : "button"}
      >
        <h3 className={`${primary ? "text-white" : "text-blue-500"}`}>
          {text}
        </h3>
      </button>
    </Link>
  );
}
