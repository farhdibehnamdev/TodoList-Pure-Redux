import appElement from "./common";
const toggleTaskDetailsPanel = function (e) {
  const taskDetails = document.querySelector(".task-details");
  taskDetails.classList.toggle("hidden");
};

const toggleMenu = function (value) {
  if (value) {
    const element = document.querySelector(value);
    element && element.classList.toggle("hidden");
  }
};

const openMenu = function (e) {
  if (e.target.classList.contains("remind-me")) {
    toggleMenu(".remind-me-menu");
  } else if (e.target.classList.contains("add-due-date")) {
    toggleMenu(".add-due-date-menu");
  } else if (e.target.classList.contains("repeat")) {
    toggleMenu(".repeat-menu");
  }
};
const closeOpenedMenu = function (e) {
  if (!e.target.classList.contains("task-date")) {
    const menu = document.querySelector(".remind-me-menu");
    if (!menu.classList.contains("hidden")) {
      menu.classList.add("hidden");
    }
  }
};
(function () {
  appElement.addEventListener("click", toggleTaskDetailsPanel);
  const taskDetailsDate = document.querySelector(".task-details-date");
  taskDetailsDate.addEventListener("click", openMenu);
  document.addEventListener("click", closeOpenedMenu);
  const closeBtn = document.querySelector(".close-task-details");
  closeBtn.addEventListener("click", toggleTaskDetailsPanel);
})();
