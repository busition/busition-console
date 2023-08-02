import Script from "next/script";
import { useEffect } from "react";
import FilledButton from "../../../components/Button/FilledButton";

export default function Home() {
  useEffect(() => {
    if (typeof window !== undefined) {
      console.log((window as any).INIStdPay);
      console.log(typeof (window as any).INIStdPay);
      if ((window as any).INIStdPay) {
        console.log("yes");
      }
    }
  }, []);

  return (
    <div id="shop">
      <Script
        src="https://stgstdpay.inicis.com/stdjs/INIStdPay.js"
        type="text/javascript"
        onLoad={() => {}}
      />
      <FilledButton
        text="구매하기"
        handleOnclick={async () => {
          if (document.getElementById("pay_form")) {
            document.getElementById("pay_form")?.remove();
          }
          const form = document.createElement("form");
          form.method = "post";
          form.acceptCharset = "UTF-8";
          form.hidden = false;
          form.id = "pay_form";

          const data: any = {
            version: "1.0",
            gopaymethod: "Card",
            mid: "INIpayTest",
            signature:
              "df667826df4e69d481953c2ed406a788430fdb2c84e89db7c2b5df7c845c5a28",
            mKey: "3a9503069192f207491d4b19bd743fc249a761ed94246c8c42fed06c3cd15a33",
            price: 100,
            oid: "ORDER_sample_767325785_7854-af6",
            timestamp: 1689767325792,
            currency: "WON",
            goodname: "Sample",
            buyername: "홍길동",
            buyertel: "01012341234",
            buyeremail: "sample@sample.com.kr",
            returnUrl: "http://localhost:5050/v1/inicis/pay/after",
            payViewType: "popup",
            popupUrl:
              "http://localhost:5050/v1/inicis/popup/open/ORDER_sample_767325785_7854-af6",
            closeUrl: "",
          };
          for (let o in data) {
            const input = document.createElement("input");
            input.name = o;
            input.value = data[o];
            input.hidden = true;
            form.appendChild(input);
          }
          document.querySelector("#shop")?.appendChild(form);
          (window as any).INIStdPay.pay("pay_form");
        }}
      />
    </div>
  );
}
