import Link from "next/link";
import styled from "styled-components";

export default function HomeFooter() {
  return (
    <footer className="sm:w-full pb-[28px] sm:mx-auto sm:max-w-2xl mx-auto lg:w-full lg:max-w-full px-[20px]">
      <Address className="text-sm mb-[12px]">
        상호명 : 버지션 (Busition)
        <span className="bar" />
        대표자명 : 우정헌
        <p className="text-[#3b4859]">
          이메일 : contact@wookingwoo.com
        </p>
      </Address>
      <p className="text-sm" style={{ color: "rgba(59, 72, 89, 0.6)" }}>
        개인정보관리책임자 : 유경민
      </p>
      <p className="text-[#3b4859] text-sm">
        <Link href={"/policy/service"}>
          <a className="cursor-pointer">이용약관</a>
        </Link>
        <span className="bar" />
        <Link href={"/policy/privacy"}>
          <a className="cursor-pointer">개인정보 처리방침</a>
        </Link>
      </p>
    </footer>
  );
}

const Address = styled.address`
  color: rgba(59, 72, 89, 0.6);
  font-style: normal;
  line-height: 1.7;
`;
