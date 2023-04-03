import { ReactNode, useEffect, useState } from "react";

interface DynamicDivBoxProps {
  children: ReactNode;
}

export default function DynamicDivBox({ children }: DynamicDivBoxProps) {
  // 화면 크기에 따라 달라지는 div
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const ResizeHeight = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", ResizeHeight);

    return () => {
      window.removeEventListener("resize", ResizeHeight);
    };
  }, []);

  return <div style={{ height: `${height}px` }}>{children}</div>;
}
