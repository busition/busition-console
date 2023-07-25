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
