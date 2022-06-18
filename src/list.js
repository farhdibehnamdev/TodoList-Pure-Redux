import store from "./redux/store";

export const DefautListComponent = function () {
  const state = store.getState();
  const listTasks = document.querySelector(".tasks .messages-count");
  const tasks = state.list[state.activeListId].tasksId;
  let counter = 0;
  tasks.forEach((taskId) => {
    const task = state.tasks[taskId].task;
    task.completed === false ? counter++ : counter;
  });
  if (counter > 0) {
    listTasks.classList.remove("hidden");
    listTasks.innerHTML = counter ?? "";
  } else {
    listTasks.classList.add("hidden");
  }
};
