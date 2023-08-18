import { atom } from "recoil";

export const getSpin = atom<boolean>({
  key: "isSpin",
  default: false,
});
