import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/Button/Button";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Header />

      <section
        className="h-[50vh] sm:h-[70vh] sm:h-[70vh] md:h-[100vh]"
        id="home"
      >
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
      <section className="h-[50vh] sm:h-[70vh] md:h-[100vh]" id="console">
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
      <section className="h-[50vh] sm:h-[70vh] md:h-[100vh]" id="driver">
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
      <section className="h-[50vh] sm:h-[70vh] md:h-[100vh]" id="mate">
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
      <section className="h-[50vh] sm:h-[70vh] md:h-[100vh] " id="price">
        <div className="flex min-h-screen pt-[30px] px-[40px] justify-center items-center">
          <div className="min-w-full">
            <div className="mt-[20px] grid grid-cols-3 gap-[20px]">
              <div
                key="1"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Starter
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Trial
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      Free
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      5 Credits
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      1 User
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Direct Phone Numbers
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Landline Phone Numbers
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Corporate email addresses
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Propsetcs
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Chrome Extension
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <Link href={"/login"}>
                      <a>
                        <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                          Downgrade +
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                key="2"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Value
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Fast Start
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      $49
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      50 Credits per month
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Unlimited users
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Direct Phone Numbers
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Landline Phone Numbers
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Corporate email addresses
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Propsetcs
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Chrome Extension
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                      Current Plan
                    </button>
                  </div>
                </div>
              </div>

              <div
                key="3"
                className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
              >
                <div className="pt-[15px] px-[25px] pb-[25px]">
                  <div className="flex justify-end">
                    <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                      <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                        Pro
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                      Accelerate
                    </p>
                    <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                      $89
                    </p>
                  </div>

                  <div>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      100 Credits per month
                    </p>
                    <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                      Unlimited users
                    </p>
                  </div>
                </div>

                <div className="pt-[25px] px-[25px] pb-[35px]">
                  <div>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Direct Phone Numbers
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Landline Phone Numbers
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Corporate email addresses
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Propsetcs
                    </p>
                    <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                      Chrome Extension
                    </p>
                  </div>

                  <div className="mt-[25px]">
                    <Link href={"/login"}>
                      <a>
                        <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                          Upgrade +
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="h-[50vh] sm:h-[70vh] md:h-[100vh] flex flex-col justify-center items-center">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h2 className="text-base font-bold text-indigo-600">
              We have the best equipment
            </h2>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
              Check our awesome team members
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
              <div className="mb-8">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src="yoo.png"
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">우정헌</p>
                <p className="text-base text-gray-400 font-normal">
                  Backend developer
                </p>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
              <div className="mb-8">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src="/you.png"
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">유경민</p>
                <p className="text-base text-gray-400 font-normal">
                  Android developer
                </p>
              </div>
            </div>
            <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center">
              <div className="mb-8">
                <img
                  className="object-center object-cover rounded-full h-36 w-36"
                  src="/kim.png"
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">김준혁</p>
                <p className="text-base text-gray-400 font-normal">
                  Application developer
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;
