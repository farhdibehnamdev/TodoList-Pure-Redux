import { ADD_TASK } from "../constants/action-types.js";
const tasks = function (state = {}, action) {
  if (action.type === ADD_TASK) {
    return { ...state, [action.payload.id]: action.payload };
  } else {
    return state;
  }
};

export default tasks;
