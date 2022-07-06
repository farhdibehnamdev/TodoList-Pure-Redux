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
/**
 * This function add list to store.
 * @param {*} id This is a id parameter
 * @param {*} title This is a title parameter
 */
const addListToStore = function (id, title) {
  store.dispatch(addList(id, title));
  store.dispatch(addCollection(id));
};
const addGroupToStore = function (id, title) {
  store.dispatch(addGroup(id, title));
  store.dispatch(addCollection(id));
};
/**
 * This function take list's title from input.
 * @param {*} event this is a input event.
 * @returns
 */
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

/**
 * This function take groups's title from input.
 * @param {*} event this is a input event.
 * @returns
 */
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
/**
 * This function render lists in sidebar.
 */
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
    //   const listElement = `<li class="list hide-before" draggable="true" data-id=${data.id}>
    //   <i class="ph-list-light ph-1x" style="color: #788cde"></i>
    //   <span>${data.title}</span>
    // </li>`;
    return listElement;
  }
};
/**
 * This function create a group element
 * @param {*} data The element data that is recived
 * @returns The elment along with their data
 */
const createGroup = function (data) {
  const listElement = `<li class="group" draggable="true" data-id=${data.id}>
  <div class="group-container">
    <div>
      <i class="ph-folder-dotted-light ph-1x"></i>
      <span>${data.title}</span>
    </div>
    <i class="ph-caret-down"></i>
  </div>
  <ul class="lists-dropped">
    <li class="group-body">Drag here to add lists</li>
  </ul>
</li>`;
  // const listElement = `<li class="group" draggable="true" data-id=${data.id}>
  //     <div class="group-container">
  //     <div>
  //         <i class="ph-folder-dotted-light ph-1x"></i>
  //         <span>${data.title}</span>
  //         </div>
  //         <i class="ph-caret-down openCloseLists"></i>
  //     </div>
  //     <ul class="lists-dropped hidden">
  //     <li class="gorup-body">Drag here to add lists</li>
  //   </ul>
  // </li>`;
  return listElement;
};

const createGroupSection = function () {
  const groupPlaceholder = document.querySelector(".group-placeholder");
  groupPlaceholder.classList.remove("hidden");
};
/**
 * This function remove hover that are on other elements.
 * @param {*} e it's a mouse click event
 */
const removeHover = function (e) {
  const liElements = e.currentTarget.querySelectorAll("li");
  liElements.forEach((li) => {
    li.classList.remove("hover-sidebar");
    li.classList.add("hide-before");
  });
};
/**
 * This function add hover to current element.
 * @param {*} e it's a mouse click event
 */
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
const addListToGroup = function (element, sourceId) {
  const newList = element.classList.contains("lists-dropped")
    ? element
    : element.closest(".lists-dropped");

  newList?.appendChild(document.querySelector(`[data-id=${sourceId}]`));
  newList
    .querySelectorAll(".list")
    .forEach((list) => list.classList.add("listlist"));
};
//TODO :: search for neighbors groupbody
const hideGroupBodyElement = function (element) {
  const findGroupBody = element.closest("li.group");
  const groupBody = findGroupBody.querySelector(".group-body");
  groupBody.classList.add("hidden");
  groupBody.innerHTML = "";
  groupBody.style.listStyle = "none";
};

const checkIsListInGroup = function (e) {};

const dragStart = function (e) {
  // e.target.style.opacity = "1";
  setTimeout(() => (e.target.style.opacity = 1), 1);
  if (e.target.classList.contains("list")) {
    e.dataTransfer.setData("text/plain", e.target.getAttribute("data-id"));
    e.dataTransfer.setDragImage(e.target, 0, 0);
  }
};
const dragOver = function (e) {
  e.preventDefault();
};

const dropped = function (e) {
  e.preventDefault();
  const sourceId = e.dataTransfer.getData(
    "text/plain",
    e.target.getAttribute("data-id")
  );
  if (e.target.classList.contains("group-body")) {
    console.log("first ::::", e.target);
    hideGroupBodyElement(e.target);
    addListToGroup(e.target, sourceId);
  } else if (e.target.classList.contains("listlist")) {
    console.log("second ::::", e.target);
    hideGroupBodyElement(e.target);
    addListToGroup(e.target, sourceId);
  } else if (e.target.classList.contains("lists-dropped")) {
    console.log("third ::::", e.target);
    hideGroupBodyElement(e.target);
    addListToGroup(e.target, sourceId);
  } else if (e.target.classList.contains("lists")) {
    console.log("blah blah :::", e.target);
    hideGroupBodyElement(e.target);
    addListToGroup(e.target, sourceId);
  }
};

const dragLeave = function (e) {
  console.log("dragLeave :::", e.target);
  // if(e.target.classList.contains(''))
  if (e.target.classList.contains("lists-dropped")) {
    console.log("lists dropped");
  } else if (e.target.classList.contains("groupBody")) {
    const groupBodyParentElement = e.target.closest("ul");
    const elements =
      groupBodyParentElement.querySelectorAll(".lists-dropped > *");
    if (elements.length <= 1 && e.target.classList.contains("hidden")) {
      e.target.classList.remove("hidden");
    }
  }
};

const toggleListsDropped = function (e) {
  if (e.target.classList.contains("openCloseLists")) {
    const parentOfopenCloseListsClicked = e.target.closest("div");
    const nextSiblingOfParent =
      parentOfopenCloseListsClicked?.nextElementSibling;
    if (nextSiblingOfParent.classList.contains("hidden")) {
      nextSiblingOfParent.classList.remove("hidden");
      e.target.classList.remove("ph-caret-down");
      e.target.classList.add("ph-caret-up");
    } else if (!nextSiblingOfParent.classList.contains("hidden")) {
      nextSiblingOfParent.classList.add("hidden");
      e.target.classList.remove("ph-caret-up");
      e.target.classList.add("ph-caret-down");
    }
  }
};

(function () {
  const sidebarScrollbar = document.querySelector(".sidebar-scrollbar");
  sidebarScrollbar.addEventListener("click", (e) => {
    hoverHandler(e);
    toggleListsDropped(e);
  });

  const newGroup = document.querySelector(".new-group");
  newGroup.addEventListener("click", createGroupSection);

  const addGroup = document.querySelector(".addGroup");
  addGroup.addEventListener("keydown", groupHandler);

  const addList = document.querySelector(".addList");
  addList.addEventListener("keydown", listHandler);

  let source = document.querySelector("#list-placeholder");
  let target = source;

  // || document.querySelector("#list-placeholder .lists");

  console.log("new Target :::", target);
  console.log("new source :::", source);
  source.addEventListener("dragstart", dragStart);
  source.addEventListener("dragleave", dragLeave);
  target.addEventListener("dragover", dragOver);
  target.addEventListener("drop", dropped);
})();
