import { ADD_LIST, SET_TASK_INTO_LIST } from "../constants/action-types.js";
const initialState = {
  "Tasks-1": { id: "Tasks-1", title: "Tasks", tasksId: {} },
};
const list = function (state = initialState, action) {
  switch (action.type) {
    case ADD_LIST:
      return state;
    case SET_TASK_INTO_LIST:
      return { ...state.list, [state.activeListId]: { id: action.id } };
    default:
      return state;
  }
};
export default list;
