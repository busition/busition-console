import styled from "styled-components";

export default function Homefooter() {
  return (
    <footer className="sm:w-full pb-[28px] sm:mx-auto sm:max-w-2xl mx-auto lg:w-full lg:max-w-full px-[20px]">
      <Address className="text-sm mb-[12px]">
        상호명 버지션(busition)
        <span className="bar" />
        대표자명 : 우정헌
        <span className="bar break-mobile" />
        사업자등록번호 : 117-20-13096
        <p className="text-[#3b4859]">연락처 : 010-5942-1248</p>
        사업장 주소 : 광주광역시 서구 하남대로710번길 20, 510동 801호
        <p className="text-[#3b4859]">과세여부 : 일반과세자</p>
      </Address>
      <p className="text-[#3b4859] text-sm">made by 이승원</p>
    </footer>
  );
}

const Address = styled.address`
  color: rgba(59, 72, 89, 0.6);
  font-style: normal;
  line-height: 1.7;
`;
