/**
 * 입력받은 문자열의 첫 번째 문자를 대문자로 만들고 나머지는 소문자로 만들어서 반환시켜 줌.
 * @param str string
 * @returns string
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function jsonToFormEncoded(jsonObj: { [key: string]: any }): string {
  return Object.keys(jsonObj)
    .map((key) => {
      if (jsonObj[key] === "") {
        return encodeURIComponent(key) + "=";
      } else {
        return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key]);
      }
    })
    .join("&");
}

/**
 * 숫자를 3자리 마다 쉼표가 들어가 있는 문자열로 바꿔주는 함수
 * @param num number
 * @returns string
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
