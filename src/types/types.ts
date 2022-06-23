export type PostType = {
  id: number;
  post: string;
  likesCount: number;
};

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  aboutMe: string
};

export type DialogType = {
  id : number
  name : string
}

export type MessageType = {
  id : number
  messageText : string
} 

export type FilterType = {
  term: string
  friend: boolean | null
}

export type UserType = {
  id: number;
  name: string;
  status: string | null;
  photos: PhotosType;
  followed: boolean;
};

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};