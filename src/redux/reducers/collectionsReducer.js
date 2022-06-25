import { ADD_COLLECTION } from "../constants/action-types";
const collections = function (state = [], action) {
  switch (action.type) {
    case ADD_COLLECTION:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default collections;
