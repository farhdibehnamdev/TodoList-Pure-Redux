import { generatedId } from "./libs/utils";
import { addList } from "./redux/actions";
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
  store.dispatch(addList(id, title));
};

const listHandler = function (event) {
  if (event.key === "Enter") {
    let title = event.target.value;
    if (!title || title.length < 1) return;
    const id = generatedId("list-");
    addListToStore(id, title);
    event.target.value = "";
    event.target.focus();
  }
};
export const RenderList = function () {
  let state = store.getState();
  let html = "";

  const list = Object.values(state?.list).map((data, index) => {
    return createList({ id: data.id, title: data.title });
  });
  if (list.length > 0) {
    let joined = list.join("").replaceAll(",", "");
    html += `<ul class="lists"> ${joined} </ul>`;
  }

  const listPlaceHolder = document.querySelector("#list-placeholder");
  listPlaceHolder.innerHTML = html;
};

const createList = function (data) {
  if (data.title !== "Tasks") {
    const listElement = `<li class="list hide-before" draggable="true" data-id=${data.id}>
    <i class="ph-list-light ph-1x" style="color: #788cde"></i>
    <span>${data.title}</span>
  </li>`;
    return listElement;
  }
};

const removeHover = function (e) {
  const liElements = e.currentTarget.querySelectorAll("li");
  liElements.forEach((li) => {
    li.classList.remove("hover-sidebar");
    li.classList.add("hide-before");
  });
};
const hoverHandler = function (e) {
  if (
    e.target.classList.contains("list") ||
    e.target.classList.contains("default-list")
  ) {
    if (e.target.classList.contains("hide-before")) {
      removeHover(e);
      e.target.classList.remove("hide-before");
      e.target.classList.add("hover-sidebar");
    } else if (e.target.classList.contains("hover-sidebar")) {
      removeHover(e);
      e.target.classList.remove("hover-sidebar");
      e.target.classList.add("hide-before");
    }
  }
};

(function () {
  const sidebarScrollbar = document.querySelector(".sidebar-scrollbar");
  sidebarScrollbar.addEventListener("click", hoverHandler.bind(this));
  const addList = document.querySelector(".addList");
  addList.addEventListener("keydown", listHandler.bind(this));
})();
