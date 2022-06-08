import { ADD_TASK, SET_TASK_INTO_LIST } from "../constants/action-types.js";
export const addTask = function (id, task) {
  return {
    type: ADD_TASK,
    payload: {
      id,
      task,
    },
  };
};
export const setTaskIntoList = function (taskId) {
  return {
    type: SET_TASK_INTO_LIST,
    payload: taskId,
  };
};
