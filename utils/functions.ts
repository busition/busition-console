import jwt from "jsonwebtoken";

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

/**
 * JWT 토큰을 입력으로 받고, 해당 토큰이 만료되었는지 확인하는 함수.
 * @param token JWT token is needed
 * @returns boolean. if the token is expired, then it will return true
 */
export function isExpired(token: string): boolean {
  const decodedToken = jwt.decode(token);
  const expirationDate = (decodedToken as jwt.JwtPayload).exp;
  if (expirationDate !== undefined) {
    return Date.now() >= expirationDate * 1000;
  } else {
    return false;
  }
}

/**
 * 'yyyy-mm-dd'형식의 스트링을 ISO 8601 형식의 스트링으로 반환해주는 함수.
 * @param dateString 'yyyy-mm-dd' 형식의 스트링 값을 받습니다.
 * @returns ISO 8601 형식으로 표현된 스트링 값을 리턴합니다.
 */
export function convertToISO8601(dateString: string): string {
  const date = new Date(dateString);

  // 유효한 날짜인지 검사
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided.");
  }

  return date.toISOString().slice(0, -5) + "Z";
}
