import usersReducer, { actions, InitialStateType } from "./usersReducer";

let state: InitialStateType;

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Nikita 0",
        photos: { small: null, large: null },
        followed: false,
        status: "status 0",
      },
      {
        id: 1,
        name: "Nikita 1",
        photos: { small: null, large: null },
        followed: false,
        status: "status 1",
      },
      {
        id: 2,
        name: "Nikita 2",
        photos: { small: null, large: null },
        followed: true,
        status: "status 2",
      },
      {
        id: 3,
        name: "Nikita 3",
        photos: { small: null, large: null },
        followed: true,
        status: "status 3",
      },
    ],
    pageSize: 3,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    filter:{term:"", friend:null}
  };
});

test("followed success", () => {
  const newState = usersReducer(state, actions.followSuccess(1));
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("followed success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3));
  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});
