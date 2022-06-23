import { UserType } from "../types/types";

type tempObj = {
  followed : boolean
}

export let updateObjectInArray = (items:UserType[], itemId:number, objPropName:string, newObjProps:tempObj) => {
  //костыль :3
  const key = objPropName as string;
  return items.map((u) => {
    if (u[key as keyof typeof u] === itemId) {
      return { ...u, ...newObjProps };
    }
    return u;
  });
};
