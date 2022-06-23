import s from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import { DialogType } from "../../../types/types";
import React from "react";

type PropsType = {
  dialog: DialogType
}
const DialogItem:React.FC<PropsType> = ({dialog}) => {
  const path = `/dialogs/${dialog.id}`;
  return (
    <div className={s.dialog + " " + s.active}>
      <NavLink to={path}>{dialog.name}</NavLink>
    </div>
  );
};

export default DialogItem;
