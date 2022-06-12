import { ADD_TASK, SET_TASK_IMPORTANT } from "../constants/action-types.js";
const tasks = function (state = {}, action) {
  switch (action.type) {
    case SET_TASK_IMPORTANT:
      // console.log("state tasks important structure ::: ", state);
      // const findKey = Object.keys(state).indexOf(action.payload.taskId);
      const value = !state[action.payload].task.important;
      console.log("important value ::::", value);

      const setImportantValue = {
        ...state[action.payload].task,
        important: value,
      };
      console.log("setImportantValue ::: ", setImportantValue);
      const newState = {
        ...state[action.payload],
        task: setImportantValue,
      };

      console.log("newState ::: ", newState);
      return { ...state, [action.payload]: newState };
    case ADD_TASK:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default tasks;
