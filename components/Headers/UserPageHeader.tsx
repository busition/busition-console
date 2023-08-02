import Link from "next/link";
import Button from "../Button/Button";

interface Props {
  isScroll: boolean;
  handleClick: () => void;
}

export default function UserPageHeader({ isScroll, handleClick }: Props) {
  return (
    <header
      className={`bg-white h-[48px] w-full sticky top-0 md:h-[64px] z-50 ${
        isScroll ? "shadow-md" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-between w-full h-full pl-[24px] pr-[8px] py-[4px] md:py-[8px]">
        <Link href="/">
          <h1 className="font-bold text-2xl cursor-pointer">Busition</h1>
        </Link>
        <Button text="로그아웃" primary={true} onClick={handleClick} />
      </div>
    </header>
  );
}
