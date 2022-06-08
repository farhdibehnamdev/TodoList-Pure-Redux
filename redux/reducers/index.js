import tasks from "./tasksReducer.js";
import activeListId from "./activeListIdReducer.js";
import list from "./listReducer.js";
const initialState = {
  activeListId: "Tasks-1",
  list: { "Tasks-1": { id: "Tasks-1", title: "Tasks", tasksId: {} } },
};
console.log(initialState);
const reducer = Redux.combineReducers(
  {
    tasks,
    activeListId,
    list,
  },
  initialState
);

export default reducer;
