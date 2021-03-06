import _ from "lodash";
import store from "./redux/store";
import appElement from "./common";
import {
  addTask,
  setTaskImportant,
  setTaskIntoList,
  setTaskCompleted,
  setTasksCompletedIntoList,
  setTaskStatus,
} from "./redux/actions";
import audioAsset from "./assets/audios/CompletedSound.mp3";

import { generatedId } from "./libs/utils";

const toggleSqueeze = function (e, type) {
  const hasTask = e.target.classList.contains("has-task");
  const taskHolder = e.target.classList.contains("task-holder");
  if (hasTask) {
    const taskHodler = e.target.querySelector(".task-holder");
    type === "add"
      ? taskHodler.classList.add("squeeze")
      : taskHodler.classList.remove("squeeze");
  } else if (taskHolder) {
    type === "add"
      ? e.target.classList.add("squeeze")
      : e.target.classList.remove("squeeze");
  }
};
const squeezeTaskMouseDown = function (e) {
  toggleSqueeze(e, "add");
};
const squeezeTaskMouseUp = function (e) {
  toggleSqueeze(e, "remove");
};

const setTaskImportantHandler = function (e) {
  if (e.target.classList.contains("important-task-button")) {
    const taskId = e.target.closest("li").getAttribute("data-id");
    store.dispatch(setTaskImportant(taskId));
  }
};
//****************************************** */
//  These functions working on completion tasks
//***************************************** */
const setTaskCompletedHandler = function (e) {
  if (e.target.classList.contains("task-completed-circle")) {
    const taskId = e.target.closest("li").getAttribute("data-id");
    store.dispatch(setTaskCompleted(taskId));
    const state = store.getState();
    const currentTask = state.tasks[taskId];
    playCompletedSound(currentTask.task.completed);
    // store.dispatch(setTaskStatus(currentTask));
    store.dispatch(
      setTasksCompletedIntoList(
        taskId,
        state.activeListId,
        currentTask.task.completed
      )
    );
  }
};
const hoverCompletedHandler = function (e) {
  if (e.target.classList.contains("task-completed-circle")) {
    if (e.target.classList.contains("ph-circle-light")) {
      e.target.classList.add("ph-check-circle-light");
      e.target.classList.remove("ph-circle-light");
    }
  }
};
const unHoverCompletedHandler = function (e) {
  if (e.target.classList.contains("task-completed-circle")) {
    if (e.target.classList.contains("ph-check-circle-light")) {
      e.target.classList.add("ph-circle-light");
      e.target.classList.remove("ph-check-circle-light");
    }
  }
};
const playCompletedSound = function (status) {
  if (status) {
    const audio = new Audio(audioAsset);
    audio.play();
  }
};
const renderCompletedTasks = function (data) {
  const taskElement = `
  <li class="task" draggable="true" data-id=${data?.id}>
  <p class="has-task">
  <span class="drag-icon-check-task">
  <i class="ph-dots-six-fill"></i>
    <span class="check-task-name">
        <i class="${
          data?.completed ? "ph-check-circle-fill" : "ph-circle-light"
        } icon-task-size task-completed-circle"></i>
      <span class="${data?.completed ? "title-completed" : ""}">${
    data?.title
  }</span>
    </span> 
    </span>
   
    <span class="important-task">
      <i class="${
        data?.important ? "ph-star-fill color-task-important" : "ph-star-bold"
      } icon-task-size important-task-button"></i>
    </span>
  </p>
</li>
`;
  return taskElement;
};
const toggleCompletedTasks = function (e) {
  const getCompletedApp = document.querySelector("#completed-app");

  if (e.target.classList.contains("ph-caret-down-light")) {
    e.target.classList.add("ph-caret-right-light");
    e.target.classList.remove("ph-caret-down-light");
    getCompletedApp.classList.add("hidden");
  } else if (e.target.classList.contains("ph-caret-right-light")) {
    e.target.classList.add("ph-caret-down-light");
    e.target.classList.remove("ph-caret-right-light");
    getCompletedApp.classList.remove("hidden");
  }
};
export const TasksCompletedUI = function () {
  let state = store.getState();
  let html = "";
  const flatData = _.values(state.list[state.activeListId]?.completedTasks);
  let taskList = flatData?.map((data, index) => {
    const task = state.tasks[data.id].task;
    if (data.status) return renderCompletedTasks(task);
  });

  if (taskList.length > 0) {
    let joined = taskList.join("").replaceAll(",", "");
    html += `<ul class="completed-tasks"> ${joined} </ul>`;
  }

  const completedSection = document.querySelector("#completed-app");

  completedSection.innerHTML = html;
};
export const CompletedTasksCounts = function () {
  const state = store.getState();
  const container = document.querySelector(".completed-task-counts");
  const tasksCount = document.querySelector(
    ".completed-task-counts .tasks-count"
  );
  const tasks = state.list[state.activeListId].tasksId;
  let counter = 0;
  tasks.forEach((taskId) => {
    const task = state.tasks[taskId].task;
    task.completed === true ? counter++ : counter;
  });
  if (counter > 0) {
    container.classList.remove("hidden");
    tasksCount.innerHTML = counter;
  } else {
    container.classList.add("hidden");
  }
};
//#################################################

//****************************************** */
//  These functions working on adding tasks
//***************************************** */
const submitHandler = function (event) {
  const { activeListId } = store.getState();
  if (!event.target.matches("#add-task-input")) return;
  event.preventDefault();

  let task = event.target.querySelector(".task-input");
  if (!task || task.value.length < 1) return;

  const id = generatedId("task-");
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

  addTaskToStore(id, newTask, activeListId);

  task.value = "";
  task.focus();
};
const taskUI = function (data) {
  const taskElement = `
  <li class="task" draggable="true" data-id=${data?.id}>
  <p class="has-task">
  <span class="task-holder">
<span class="drag-icon-check-task">
<i class="ph-dots-six-fill"></i>
<span class="check-task-name">
    <i class="${
      data?.completed ? "ph-check-circle-fill" : "ph-circle-light"
    } icon-task-size task-completed-circle"></i>
  <span class="${data?.completed ? "title-completed" : ""}">${
    data?.title
  }</span>
</span>
</span>
    <span class="important-task">
      <i class="${
        data?.important ? "ph-star-fill color-task-important" : "ph-star-bold"
      } icon-task-size important-task-button"></i>
    </span>
    </span>
  </p>
</li>
`;
  if (!data.completed) return taskElement;
};
const addTaskToStore = function (id, task, activeListId) {
  const state = store.getState();
  const currentTask = state.tasks[id];

  store.dispatch(addTask(id, task));
  store.dispatch(setTaskIntoList(id, activeListId));
  store.dispatch(setTaskStatus(currentTask));
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

//**********************************************/

(function () {
  document.addEventListener("submit", submitHandler, false);

  const tasksCounterContainer = document.querySelector(
    ".collapse-completed-tasks"
  );

  tasksCounterContainer?.addEventListener("click", (e) =>
    toggleCompletedTasks(e)
  );

  appElement.addEventListener("click", (e) => {
    setTaskImportantHandler(e);
    setTaskCompletedHandler(e);
  });
  appElement.addEventListener("mousedown", (e) => squeezeTaskMouseDown(e));
  appElement.addEventListener("mouseup", (e) => squeezeTaskMouseUp(e));
  appElement.addEventListener("mouseover", (e) => {
    hoverCompletedHandler(e);
  });
  appElement.addEventListener("mouseout", (e) => {
    unHoverCompletedHandler(e);
  });
})();
