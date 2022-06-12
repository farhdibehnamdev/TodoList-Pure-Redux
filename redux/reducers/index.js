import tasks from "./tasksReducer.js";
import activeListId from "./activeListIdReducer.js";
import list from "./listReducer.js";
import currentTaskStatus from "./currentTaskStatusReducer.js";

const reducer = Redux.combineReducers({
  currentTaskStatus,
  tasks,
  activeListId,
  list,
});

export default reducer;
