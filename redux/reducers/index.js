import tasks from "./tasksReducer.js";
import activeListId from "./activeListIdReducer.js";
import list from "./listReducer.js";

const reducer = Redux.combineReducers({
  tasks,
  activeListId,
  list,
});

export default reducer;
