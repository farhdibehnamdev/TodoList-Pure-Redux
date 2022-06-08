import { SET_ACTIVE_LIST_ID } from "../constants/action-types.js";

const activeListId = function (state = null, action) {
  if (action.type === SET_ACTIVE_LIST_ID) {
    return action.payload;
  } else {
    return state;
  }
};

export default activeListId;
