import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { ThunkDispatch } from "redux-thunk";
import { FilterType, UserType } from "../../types/types";
import React, { useEffect } from "react";
import UsersSearchForm from "./UsersSearchForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersSelector,
  getCurrentPage,
  getFilter,
  getPageSize,
  getTotalUsersCount,
  getFollowingInProgress,
} from "../../redux/selectors/usersSelectors";
import { requestUsers, follow, unfollow } from "../../redux/usersReducer";
import { AppThunkDispatchType } from "../../redux/reduxStore";
import { useNavigate, useSearchParams } from "react-router-dom";
import QueryString from "qs";

type PropsType = {};

export const Users: React.FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const users = useSelector(getUsersSelector);
  const filter = useSelector(getFilter);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch: AppThunkDispatchType = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let term = searchParams.get("term");
    let friend = searchParams.get("friend");
    let page = searchParams.get("page");

    let actualPage = currentPage;
    let actualFilter = filter;

    if (page) actualPage = Number(page);
    if (term) actualFilter = { ...actualFilter, term: term as string };

    switch (friend) {
      case "null":
        actualFilter = { ...actualFilter, friend: null };
        break;
      case "true":
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        actualFilter = { ...actualFilter, friend: false };
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    let query: any = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    navigate(`/users` + QueryString.stringify(query,{addQueryPrefix:true}));
  }, [filter, currentPage]);

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  };

  //вызываеться при смене страницы с пользователям
  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const followUser = (userId: number) => {
    dispatch(follow(userId));
  };

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId));
  };

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      <div>
        {users.map((u) => (
          <User
            key={u.id}
            user={u}
            followingInProgress={followingInProgress}
            follow={followUser}
            unfollow={unfollowUser}
          />
        ))}
      </div>
    </div>
  );
};
