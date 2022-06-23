import React from "react";
import { useEffect } from "react";
import { useState } from "react";

type PropsType = {
  status: string
  updateUserStatus:(status:string) => void;
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState<string>(props.status);
  let activateEditMode = () => {
    setEditMode(true);
  };

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  let deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  let onStatusChange = (e: React.FormEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div>
          <b>Status </b>:{" "}
          <span onDoubleClick={activateEditMode}>
            {props.status || "——————"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            value={status}
            autoFocus={true}
            onBlur={deactivateEditMode}
          ></input>
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
