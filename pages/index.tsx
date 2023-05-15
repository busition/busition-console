import type { GetServerSideProps, NextPage } from "next";
import { useRef } from "react";
import Button from "../components/Button/Button";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Header />

      <section className="h-[100vh]" id="home">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center px-[40px]">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">
            Busition
          </h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-lg sm:text-2xl">추가 장비 없이</h3>
              <h3 className="text-lg sm:text-2xl">
                스마트 버스를 사용하고 싶다면?
              </h3>
              <h3 className="text-lg sm:text-2xl">지금 당장 Busition으로!</h3>
            </div>
            <Button text="Get started" primary={true} link="/console" />
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="console">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">
            Console
          </h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-3xl sm:text-3xl">관리자용 웹 콘솔</h3>
              <h3 className="text-lg sm:text-2xl">
                스케줄 관리, 탑승자 및 기사 배정
              </h3>
              <h3 className="text-lg sm:text-2xl">버스 현황 관리</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="driver">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">driver</h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-3xl sm:text-3xl">기사용 안드로이드 앱</h3>
              <h3 className="text-lg sm:text-2xl">
                실시간 스케줄, 탑승자 명단, 잔여시간/거리 제공
              </h3>
              <h3 className="text-lg sm:text-2xl">최적 노선, 네비 자동 연결</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="mate">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">mate</h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-3xl sm:text-3xl">탑승자, 보호자용 앱</h3>
              <h3 className="text-lg sm:text-2xl">
                실시간 버스 위치, 도착 예정 시간, 잔여 좌석 정보 제공
              </h3>
              <h3 className="text-lg sm:text-2xl">
                친구 공유, 승하차 알림 기능
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="price">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">price</h1>
          <div className="flex flex-col justify-center items-center gap-[3vh] text-center">
            <div>
              <h3 className="text-lg sm:text-3xl">Comming Soon!</h3>
              <Button text="베타테스트 신청" primary={true} link="/" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
