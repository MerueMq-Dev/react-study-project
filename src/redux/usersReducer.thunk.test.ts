import { APIResponseType } from "../api/api";
import { usersApi } from "../api/usersApi";
import { ResultCodesEnum } from "../types/enums";
import { actions } from "./usersReducer";
import { follow,unfollow } from "./usersReducer";

jest.mock("../api/usersApi");
const usersAPIMock = usersApi as jest.Mocked<typeof usersApi>;


const dispatchMock = jest.fn();
const getState = jest.fn();

beforeEach(()=>{
  dispatchMock.mockClear()
  getState.mockClear();
  usersAPIMock.followUser.mockClear();
  usersAPIMock.unfollowUser.mockClear();
});

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};


test("success follow thunk", async () => {
  
  usersAPIMock.followUser.mockResolvedValue(result);
  const thunk = follow(1);

  await thunk(dispatchMock,getState,{});

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1));
});

test("success unfollow thunk", async () => {
  
  usersAPIMock.unfollowUser.mockResolvedValue(result);

  const thunk = unfollow(1);

  await thunk(dispatchMock,getState,{});
  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2,actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false, 1));
});
