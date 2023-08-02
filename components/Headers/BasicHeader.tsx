import Link from "next/link";

export default function BasicHeader() {
  return (
    <header className="w-full h-[64px] flex flex-row justify-center items-center border-solid border-b top-0">
      <Link href="/">
        <a>
          <h1 className="font-bold text-2xl cursor-pointer">Busition</h1>
        </a>
      </Link>
    </header>
  );
}
