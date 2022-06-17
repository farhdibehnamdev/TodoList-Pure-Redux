import _ from "lodash";
import store from "./redux/store";
import {
  addTask,
  setTaskImportant,
  setTaskIntoList,
  setTaskCompleted,
  setTasksCompletedIntoList,
  setTaskStatus,
} from "./redux/actions";
import { generatedId } from "./libs/utils";

// Working with dispatch methods
const addTaskHandler = function (id, task, activeListId) {
  store.dispatch(addTask(id, task));
  store.dispatch(setTaskIntoList(id, activeListId));
};

const setTaskImportantHandler = function (e) {
  if (e.target.classList.contains("important-task-button")) {
    const taskId = e.target.closest("li").getAttribute("data-id");
    store.dispatch(setTaskImportant(taskId));
  }
};

const setTaskCompletedHandler = function (e) {
  const state = store.getState();
  if (e.target.classList.contains("task-completed-circle")) {
    const taskId = e.target.closest("li").getAttribute("data-id");
    console.log("setTaskComplete ::::", state.tasks[taskId]);
    store.dispatch(setTaskCompleted(taskId));
    store.dispatch(setTaskStatus(taskId));
    store.dispatch(setTasksCompletedIntoList(taskId, state.activeListId));
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
const TasksCompletedUI = function (taskElement, data) {
  const completedSection = document.querySelector(
    "#completed-app .completed-tasks"
  );
  completedSection.innerHTML = taskElement;
};

const taskUI = function (data) {
  const taskElement = `<li class="task" draggable="true" data-id=${data?.id}>
  <p class="has-task">
    <span class="check-task-name">
        <i class="${
          data?.completed ? "ph-check-circle-fill" : "ph-circle-light"
        } icon-task-size task-completed-circle"></i>
      <span class="${data?.completed ? "title-completed" : ""}">${
    data?.title
  }</span>
    </span>
    <span class="important-task">
      <i class="${
        data?.important ? "ph-star-fill color-task-important" : "ph-star-bold"
      } icon-task-size important-task-button"></i>
    </span>
  </p>
</li>
`;
  if (!data.completed) return taskElement;
  else {
    TasksCompletedUI(taskElement, data);
  }
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
  const appElement = document.querySelector(".main-tasks-container");
  appElement.addEventListener("click", (e) => {
    setTaskImportantHandler(e);
    setTaskCompletedHandler(e);
  });
  appElement.addEventListener("mouseover", (e) => {
    hoverCompletedHandler(e);
  });
  appElement.addEventListener("mouseout", (e) => {
    unHoverCompletedHandler(e);
  });
})();
