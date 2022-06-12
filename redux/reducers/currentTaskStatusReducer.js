import { SET_TASK_STATUS } from "../constants/action-types.js";

const currentTaskStatus = function (state = {}, action) {
  switch (action.type) {
    case SET_TASK_STATUS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default currentTaskStatus;
