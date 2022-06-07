import { ADD_TASK } from "../constants/action-types.js";
export const addTask = function (id, task) {
  return {
    type: ADD_TASK,
    payload: {
      id,
      task,
    },
  };
};
