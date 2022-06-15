import { SET_ACTIVE_LIST_ID } from "../constants/action-types.js";
const initialState = "List-1";
const activeListId = function (state = initialState, action) {
  if (action.type === SET_ACTIVE_LIST_ID) {
    return action.payload;
  } else {
    return state;
  }
};

export default activeListId;
