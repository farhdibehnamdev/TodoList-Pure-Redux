import { ADD_LIST, SET_TASK_INTO_LIST } from "../constants/action-types.js";
const initialState = {
  "List-1": { id: "List-1", title: "Tasks", tasksId: [] },
};
const list = function (state = initialState, action) {
  switch (action.type) {
    case SET_TASK_INTO_LIST:
      const arrOfKeys = Object.keys(state);
      const loc = arrOfKeys.indexOf(action.payload.activeListId);
      const listId = arrOfKeys[loc]; //List-1
      const newTasksId = [...state[listId].tasksId, action.payload.taskId];
      const newState = {
        ...state[arrOfKeys[loc]],
        tasksId: newTasksId,
      };
      // function isObject(item) {
      //   return item && typeof item === "object" && !Array.isArray(item);
      // }
      // const mergeDeep = function (target, ...sources) {
      //   if (!sources.length) return target;
      //   const source = sources.shift();

      //   if (isObject(target) && isObject(source)) {
      //     for (const key in source) {
      //       if (isObject(source[key])) {
      //         if (!target[key]) Object.assign(target, { [key]: {} });
      //         mergeDeep(target[key], source[key]);
      //       } else {
      //         Object.assign(target, { [key]: source[key] });
      //       }
      //     }
      //   }

      //   return mergeDeep(target, ...sources);
      // };

      // const newObj = mergeDeep(state[arrOfKeys[loc]], {
      //   tasksId: {
      //     [action.payload.taskId]: { taskId: action.payload.taskId },
      //   },
      // });

      return { ...state, [listId]: { ...newState } };
    default:
      return state;
  }
};
export default list;
