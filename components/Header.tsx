import Link from "next/link";
import Button from "./Button/Button";

export default function Header() {
  const modes: string[] = ["console", "driver", "mate", "price"];

  return (
    <header className="bg-white h-[48px] w-screen sticky top-0 md:h-[64px]">
      <div className="flex flex-row items-center justify-between w-full h-full pl-[24px] pr-[8px] shadow-md py-[4px] md:py-[8px]">
        <Link href="/#home">
          <h1 className="font-bold text-2xl cursor-pointer">Busition</h1>
        </Link>
        <div className="h-full flex flex-row items-center gap-[16px]">
          <div className="hidden md:flex flex-row gap-[8px]">
            {modes.map((item, id) => (
              <Link href={`/#${item}`} key={item}>
                <h3 className="px-[12px] py-[8px] text-blue-500 cursor-pointer">
                  {item}
                </h3>
              </Link>
            ))}
          </div>

          <Button text="Get started" primary={true} link="/" />
        </div>
      </div>
    </header>
  );
}
