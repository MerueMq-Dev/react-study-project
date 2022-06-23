import profileReducer,{actions} from "./profileReducer";
import {AppStateType} from "./reduxStore";


let state = {
  posts: [
    { id: 1, post: "Hi", likesCount: 5 },
    { id: 2, post: "How are you?", likesCount: 10 },
  ],
  profile: null,
  status: ""
};

test('length of post should be incremented', () => {
  let action =  actions.addPostActionCreator("new Post Text");
  let newState = profileReducer(state,action);
  expect(newState.posts.length).toBe(3);
});


test("message of new post should be correct", () => {
  let action = actions.addPostActionCreator("new Post Text");
  let newState = profileReducer(state,action);
  expect(newState.posts[2].post).toBe("new Post Text");
});

test('after deleting length of post should be decrement', () => {
  let action = actions.deletePost(1);
  let newState = profileReducer(state,action);
  expect(newState.posts.length).toBe(1);
});

test(`after deleting length of post shouldn't be decrement if id is incorrect`, () => {
  let action = actions.deletePost(1000);
  let newState = profileReducer(state,action);
  expect(newState.posts.length).toBe(2);
});



