import {
  ADD_TASK,
  SET_TASK_IMPORTANT,
  SET_TASK_INTO_LIST,
  SET_TASK_STATUS,
} from "../constants/action-types.js";
export const addTask = function (id, task) {
  return {
    type: ADD_TASK,
    payload: {
      id,
      task,
    },
  };
};
export const setTaskIntoList = function (taskId, activeListId) {
  return {
    type: SET_TASK_INTO_LIST,
    payload: {
      taskId,
      activeListId,
    },
  };
};

export const setTaskImportant = function (taskId) {
  return {
    type: SET_TASK_IMPORTANT,
    payload: taskId,
  };
};

export const setTaskStatus = function (taskStatus) {
  return {
    type: SET_TASK_STATUS,
    payload: taskStatus,
  };
};
