import icon from "./assets/images/microsoft-todo-icon.png";
import avatar from "./assets/images/man.png";
import "./assets/css/style.css";
import "./assets/css/icons.css";
import store from "./redux/store";
import { AddTask, TasksCompletedUI, CompletedTasksCounts } from "./task";
import { CountsOfImportantTask, CountsOfTasks } from "./list";
const avatarImg = document.querySelector(".img-avatar");
const iconImg = document.querySelector(".img-icon");
avatarImg.src = avatar;
iconImg.src = icon;
(function () {
  store.subscribe(() => {
    AddTask();
    CountsOfTasks();
    TasksCompletedUI();
    CompletedTasksCounts();
    CountsOfImportantTask();
  });
})();

// const menu = document.querySelector(".menu");
// const menus = document.querySelectorAll(".menu li");
// const newListBtn = document.querySelector(".new-list-btn");
// const containerGroupList = document.querySelector(".container-group-list ul");

// const addTaskList = function () {
//   const newIcon = document.createElement("i");
//   newIcon.classList.add("ph-list-bold");
//   newIcon.style.color = "#788CDE";
//   const createNewLIElement = document.createElement("li");
//   const createNewDiv = document.createElement("Div");
//   const untitledList = document.createTextNode("Untitled list");
//   createNewDiv.classList.add("list-name", "rename-list-name", "untitled-list");
//   createNewDiv.appendChild(untitledList);
//   createNewLIElement.append(newIcon, createNewDiv);
//   createNewDiv.setAttribute("contenteditable", true);
//   createNewLIElement.classList.add("active-menu", "new-user-list");
//   containerGroupList.insertAdjacentElement("afterend", createNewLIElement);
// };

// /**
// this mehtod add active class one menus by each click */
// const toggleActiveClassHandler = function (e) {
//   menus.forEach((menu) => {
//     menu.classList.remove("active-menu");
//     menu.classList.add("hide-before");
//   });
//   const currentSelectedElement = e.target.className;
//   menus.forEach((menu) => {
//     if (menu.className === currentSelectedElement) {
//       e.target.classList.add("active-menu");
//       e.target.classList.remove("hide-before");
//     }
//   });
// };
// menu.addEventListener("click", toggleActiveClassHandler);
// newListBtn.addEventListener("click", addTaskList);
