import { instance } from "./api";
import { ProfileType, PhotosType} from "../types/types";
import {APIResponseType} from "./api";

// Пофиксил баг с помощью этого кастыля. Кастыль девелопмент в действии.
type DataType ={
  photos: PhotosType
}

export const profileApi = {
  getProfile: (userId: number) => {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },
  getStatus: (userId: number) => {
    return instance.get<string>(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },
  updateStatus: (status: string) => {
    return instance
      .put<APIResponseType>(`profile/status`, { status })
      .then((res) => res.data);
  },
  savePhoto: (photoFile: File) => {
    let formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<APIResponseType<DataType>>(`profile/photo`, formData).then(res=>res.data);
  },
  saveProfile: (profile: ProfileType) => {
    return instance.put<APIResponseType>(`profile`, profile).then((res) => res.data);
  },
};
