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
              <h3 className="text-lg sm:text-2xl">추가 장치 설치 필요 없이</h3>
              <h3 className="text-lg sm:text-2xl">
                스마트 버스를 사용하고 싶다면?
              </h3>
              <h3 className="text-lg sm:text-2xl">지금 당장 Busition으로</h3>
            </div>
            <Button text="Get started" primary={true} link="/" />
          </div>
        </div>
      </section>
      <section className="h-[100vh]" id="console">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">
            Console
          </h1>
        </div>
      </section>
      <section className="h-[100vh]" id="driver">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">driver</h1>
        </div>
      </section>
      <section className="h-[100vh]" id="mate">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">mate</h1>
        </div>
      </section>
      <section className="h-[100vh]" id="price">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-center font-bold">price</h1>
        </div>
      </section>
    </div>
  );
};

export default Home;
