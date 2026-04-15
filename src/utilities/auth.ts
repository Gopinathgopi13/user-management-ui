import Cookies from "js-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA } from "./constant";
import type { AuthSessionData } from "../types";

export const setAuthSession = ({
  access_token,
  refresh_token,
  user,
}: AuthSessionData) => {
  console.log(access_token, refresh_token);
  console.log(user, "User data being set in cookies");
  Cookies.set(ACCESS_TOKEN, access_token, { expires: 7 });
  Cookies.set(REFRESH_TOKEN, refresh_token, { expires: 7 });
  Cookies.set(USER_DATA, JSON.stringify(user), { expires: 7 });
};

export const clearAuthSession = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  Cookies.remove(USER_DATA);
};

export const getCookie = (name: string): string | null => {
  return Cookies.get(name) || null;
};
