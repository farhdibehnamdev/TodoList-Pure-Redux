import appElement from "./common";
const toggleTaskDetailsPanel = function (e) {
  const taskDetails = document.querySelector(".task-details");
  taskDetails.classList.toggle("hidden");
};

const openMenu = function (e) {
  if (e.target.classList.contains("task-detail")) {
    const remindMenu = document.querySelector(".remind-me-menu");
    remindMenu && remindMenu.classList.toggle("hidden");
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
})();
