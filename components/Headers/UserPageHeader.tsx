import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Button/Button";

interface Props {
  isScroll: boolean;
  handleClick: () => void;
}

export default function UserPageHeader({ isScroll, handleClick }: Props) {
  const [isResized, setIsResized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window) {
        if (window.innerWidth >= 1024) {
          setIsResized(true);
        } else {
          setIsResized(false);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${isScroll && isResized ? "shadow-md" : ""} w-full block z-0`}
    >
      <header className={`bg-white h-[48px] w-full md:h-[64px]`}>
        <div className="flex flex-row items-center justify-between w-full h-full pl-[24px] pr-[8px] py-[4px] md:py-[8px]">
          <Link href="/">
            <h1 className="font-bold text-2xl cursor-pointer">Busition</h1>
          </Link>
          <Button text="로그아웃" primary={true} onClick={handleClick} />
        </div>
      </header>
    </div>
  );
}
