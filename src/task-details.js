import appElement from "./common";
const toggleTaskDetailsPanel = function (e) {
  const taskDetails = document.querySelector(".task-details");
  taskDetails.classList.toggle("hidden");
};

(function () {
  appElement.addEventListener("click", toggleTaskDetailsPanel);
})();
