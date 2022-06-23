import {
  ADD_LIST,
  SET_TASK_INTO_LIST,
  SET_TASKS_COMLETED_INTO_LIST,
} from "../constants/action-types.js";
const initialState = {
  "List-1": { id: "List-1", title: "Tasks", tasksId: [], completedTasks: {} },
};
const list = function (state = initialState, action) {
  const listManipulation = function (prop) {
    const arrOfKeys = Object.keys(state);

    const loc = arrOfKeys.indexOf(action.payload.activeListId);
    const listId = arrOfKeys[loc]; //List-1
    let newTasksId;
    if (prop === "completedTasks") {
      newTasksId = {
        ...state[listId][prop],

        [action.payload.taskId]: {
          id: action.payload.taskId,
          status: action.payload.status,
        },
      };
    } else {
      newTasksId = [...state[listId][prop], action.payload.taskId];
    }
    const newState = {
      ...state[arrOfKeys[loc]],
      [prop]: newTasksId,
    };
    return [listId, newState];
  };
  switch (action.type) {
    case SET_TASKS_COMLETED_INTO_LIST: {
      console.log("state ::: ", state);
      const [listId, newState] = listManipulation("completedTasks");
      return { ...state, [listId]: { ...newState } };
    }
    case SET_TASK_INTO_LIST:
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
      const [listId, newState] = listManipulation("tasksId");
      return { ...state, [listId]: { ...newState } };
    case ADD_LIST:
      const newList = {
        ...state.list,
        [action.payload.id]: {
          id: action.payload.id,
          title: action.payload.title,
          tasksId: [],
          completedTasks: {},
        },
      };
      return {
        ...state,
        ...newList,
      };
    default:
      return state;
  }
};
export default list;
