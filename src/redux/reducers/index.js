import { combineReducers } from "redux";
import tasks from "./tasksReducer";
import activeListId from "./activeListIdReducer";
import list from "./listReducer";
import group from "./groupReducer";
import collections from "./collectionsReducer";
import currentTaskStatus from "./currentTaskStatusReducer";

const reducer = combineReducers({
  currentTaskStatus,
  tasks,
  activeListId,
  list,
  group,
  collections,
});

export default reducer;
