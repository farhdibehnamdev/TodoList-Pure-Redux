import { generatedId } from "./libs/utils";
import { addList } from "./redux/actions";
import activeListId from "./redux/reducers/activeListIdReducer";
import store from "./redux/store";

const getNumberOfTasks = function (status) {
  const state = store.getState();
  const tasks = state.list[state.activeListId].tasksId;
  let counter = 0;
  tasks.forEach((taskId) => {
    const task = state.tasks[taskId].task;
    if (status === "important") task[status] === true ? counter++ : counter;
    else if (status === "completed")
      task[status] === false ? counter++ : counter;
  });
  return counter;
};

export const CountsOfTasks = function () {
  const listTasks = document.querySelector(".tasks .messages-count");
  if (getNumberOfTasks("completed") > 0) {
    listTasks.classList.remove("hidden");
    listTasks.innerHTML = getNumberOfTasks("completed") ?? "";
  } else {
    listTasks.classList.add("hidden");
  }
};

export const CountsOfImportantTask = function () {
  const listTasks = document.querySelector(".important .messages-count");
  if (getNumberOfTasks("important") > 0) {
    listTasks.classList.remove("hidden");
    listTasks.innerHTML = getNumberOfTasks("important") ?? "";
  } else {
    listTasks.classList.add("hidden");
  }
};

const addListToStore = function (id, title) {
  const state = store.getState();
  store.dispatch(addList(id, title));
};

const listHandler = function (event) {
  if (event.key === "Enter") {
    let title = event.target.value;
    if (!title || title.length < 1) return;
    const id = generatedId("list-");
    const newList = {
      id,
      title,
    };
    addListToStore(id, newList);
    event.target.value = "";
    event.target.focus();
  }
};

(function () {
  const addList = document.querySelector(".addList");
  addList.addEventListener("keydown", listHandler.bind(this));
})();
