import store from "../redux/store/index.js";
import {
  addTask,
  setTaskImportant,
  setTaskIntoList,
} from "../redux/actions/index.js";
import { generatedId } from "../libs/utils.js";

// Working with dispatch methods
const addTaskHandler = function (id, task, activeListId) {
  store.dispatch(addTask(id, task));
  store.dispatch(setTaskIntoList(id, activeListId));
  console.log(store.getState());
};

const setTaskImportantHandler = function (e) {
  const taskId = e.target.closest("li").getAttribute("data-id");
  console.log(taskId);
  store.dispatch(setTaskImportant(taskId));
};

const submitHandler = function (event) {
  const { activeListId } = store.getState();
  if (!event.target.matches("#add-task-input")) return;
  event.preventDefault();

  let task = event.target.querySelector(".task-input");
  if (!task || task.value.length < 1) return;

  const id = generatedId();
  const newTask = {
    id,
    title: task.value,
    createdDate: Date.now(),
    important: false,
    completed: false,
    isOverDated: false,
    planned: false,
    myDay: false,
  };

  addTaskHandler(id, newTask, activeListId);

  task.value = "";
  task.focus();
};
const taskUI = function (data) {
  console.log("data :D:", data);
  return `<li class="task" draggable="true" data-id=${data?.id}>
  <p class="has-task">
    <span class="check-task-name">
      <i class="ph-circle-bold icon-task-size"></i>
      <span>${data?.title}</span>
    </span>
    <span class="important-task">
    
      <i class="${
        data.important ? "ph-star-fill color-task-important" : "ph-star-bold"
      } icon-task-size important-task-button"></i>
    </span>
  </p>
</li>`;
};
export const AddTask = function () {
  let state = store.getState();
  let html = "";
  const flatData = _.values(state?.tasks);
  let taskList = flatData?.map((data, index) => {
    return taskUI(data.task);
  });

  if (taskList.length > 0) {
    let joined = taskList.join("").replaceAll(",", "");
    html += `<ul class="tasks"> ${joined} </ul>`;
  }

  const app = document.querySelector("#app");
  app.innerHTML = html;
};
export const RenderTask = function () {
  const state = store.getState();
  const tasksId = state?.list?.[state?.activeListId]?.tasksId;
  for (const taskId of tasksId) {
    const task = state.tasks?.[taskId].task;
    taskUI(task);
  }
};

(function () {
  document.addEventListener("submit", submitHandler, false);
  const appElement = document.querySelector("#app");
  appElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("important-task-button")) {
      setTaskImportantHandler(e);
    }
  });
})();
