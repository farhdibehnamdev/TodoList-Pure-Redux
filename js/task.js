import store from "../redux/store/index.js";
import {
  addTask,
  setTaskImportant,
  setTaskIntoList,
  setTaskStatus,
} from "../redux/actions/index.js";
import { generatedId } from "../libs/utils.js";

// Working with dispatch methods
const addTaskHandler = function (id, task, activeListId) {
  store.dispatch(addTask(id, task));
  store.dispatch(setTaskIntoList(id, activeListId));
  console.log(store.getState());
};

const setCurrentTaskStatusHandler = function (taskId) {
  const { tasks } = store.getState();
  const taskStatusObject = tasks[taskId].task;
  store.dispatch(setTaskStatus(taskStatusObject));
};
const setTaskImportantHandler = function (e) {
  const taskId = e.target.closest("li").getAttribute("data-id");
  store.dispatch(setTaskImportant(taskId));
  setCurrentTaskStatusHandler(taskId);
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

export const TaskViewComponent = function () {
  let state = store.getState();
  let html = "";
  const flatData = _.values(state?.tasks);
  let taskList = flatData?.map((data, index) => {
    return `
    <li class="task" data-id=${data?.task?.id}>
         <p class="has-task">
           <span class="check-task-name">
             <i class="ph-circle-bold icon-task-size"></i>
             <span>${data?.task?.title}</span>
           </span>
           <span class="important-task">
             <i class="ph-star-bold icon-task-size important-task-button"></i>
           </span>
         </p>
       </li>
       `;
  });

  if (taskList.length > 0) {
    let joined = taskList.join("").replaceAll(",", "");
    html += `<ul class="tasks"> ${joined} </ul>`;
  }

  return html;
};
export const TaskImportantComponent = function () {
  const { tasksStatus } = store.getState();
  const currentElement = document.querySelector(".task");
  currentElement.getAttribute("data-id[]");
};
(function () {
  document.addEventListener("submit", submitHandler, false);
  const taskElement = document.querySelector("#app");
  taskElement.addEventListener("click", (e) => {
    if (e.target.closest("i")) {
      setTaskImportantHandler(e);
    }
  });
})();
