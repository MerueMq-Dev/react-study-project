import React from "react";
import { useSelector } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import {
  getIsFetching,
} from "../../redux/selectors/usersSelectors";
import { Users } from "./Users";

type UserPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UserPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
