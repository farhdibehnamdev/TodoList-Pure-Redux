import {
  ADD_TASK,
  SET_TASK_IMPORTANT,
  SET_TASK_COMPLETED,
} from "../constants/action-types.js";
const tasks = function (state = {}, action) {
  const taskManipulation = function (prop) {
    const value = !state[action.payload].task[prop];

    const setTaskValue = {
      ...state[action.payload].task,
      [prop]: value,
    };
    const newState = {
      ...state[action.payload],
      task: setTaskValue,
    };

    return { ...state, [action.payload]: newState };
  };
  switch (action.type) {
    case SET_TASK_IMPORTANT:
      return taskManipulation("important");
    case SET_TASK_COMPLETED:
      return taskManipulation("completed");
    case ADD_TASK:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default tasks;
