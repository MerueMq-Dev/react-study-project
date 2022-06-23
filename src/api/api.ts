import axios from "axios";
import {  UserType } from "../types/types";
import {ResultCodesEnum} from "../types/enums";

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "8bfb229c-b16e-49a1-adf1-d7bcbea22268",
  },
});


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  resultCode: RC;
  messages: string[];
};
export type GetItemsType = {
  items: UserType[]
  totalCount: number
  error: string | null
}
