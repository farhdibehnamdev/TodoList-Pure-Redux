import { ADD_GROUP } from "../constants/action-types";
const group = function (state = {}, action) {
  switch (action.type) {
    case ADD_GROUP:
      const newGroup = {
        ...state.group,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          lists: {},
          type: "Group",
        },
      };
      return {
        ...state,
        ...newGroup,
      };
    default:
      return state;
  }
};

export default group;
