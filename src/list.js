import { generatedId } from "./libs/utils";
import { addList, addGroup, addCollection } from "./redux/actions";
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
  store.dispatch(addCollection(id));
};
const addGroupToStore = function (id, title) {
  store.dispatch(addGroup(id, title));
  store.dispatch(addCollection(id));
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
const groupHandler = function (event) {
  if (event.key === "Enter") {
    let title = event.target.value;
    if (!title || title.length < 1) return;
    const id = generatedId("group-");
    addGroupToStore(id, title);
    event.target.value = "";
    event.target.focus();
  }
};

export const RenderList = function () {
  let { list, group, collections } = store.getState();
  const groupList = { ...list, ...group };
  let html = "";

  const lists = collections.map((data, index) => {
    const currentRow = groupList[data.id];
    if (currentRow.type === "Group")
      return createGroup({ id: currentRow.id, title: currentRow.title });
    else {
      return createList({ id: currentRow.id, title: currentRow.title });
    }
  });
  if (lists.length > 0) {
    let joined = lists.join("").replaceAll(",", "");
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
// <i class="ph-list-light ph-1x" style="color: #788cde"></i>
const createGroup = function (data) {
  const listElement = `<li class="group" draggable="true" data-id=${data.id}>
      <div>
      <div>
          <i class="ph-folder-dotted-light ph-1x"></i>
          <span>${data.title}</span>
          </div>
          <i class="ph-caret-down"></i>
      </div>
    <ul class="lists-dropped hidden"></ul>
  </li>`;
  return listElement;
};

const createGroupSection = function () {
  const groupPlaceholder = document.querySelector(".group-placeholder");
  groupPlaceholder.classList.remove("hidden");
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
  sidebarScrollbar.addEventListener("click", hoverHandler);

  const newGroup = document.querySelector(".new-group");
  newGroup.addEventListener("click", createGroupSection);

  const addGroup = document.querySelector(".addGroup");
  addGroup.addEventListener("keydown", groupHandler);

  const addList = document.querySelector(".addList");
  addList.addEventListener("keydown", listHandler);
})();
