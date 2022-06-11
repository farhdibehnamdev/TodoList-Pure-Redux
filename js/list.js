import store from "../redux/store/index.js";

export const DefautListComponent = function () {
  const { list, activeListId } = store.getState();
  const listTasks = document.querySelector(".tasks .messages-count");
  listTasks.innerHTML = list[activeListId].tasksId.length;
};
