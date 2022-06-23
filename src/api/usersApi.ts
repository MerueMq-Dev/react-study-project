import { FilterType } from "../types/types";
import { GetItemsType, instance, APIResponseType } from "./api";

export const usersApi = {
  getUsers: (currentPage = 1, pageSize = 5, term:string ="", friend:null | boolean) => {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend !== null ? `&friend=${friend}` : ``)
      )
      .then((response) => response.data);
  },
  unfollowUser: (userId: number) => {
    return instance
      .delete<APIResponseType>(`follow/${userId}`)
      .then((response) => {
        return response.data;
      });
  },
  followUser: (userId: number) => {
    return instance
      .post<APIResponseType>(`follow/${userId}`)
      .then((response) => {
        return response.data;
      });
  },
};
