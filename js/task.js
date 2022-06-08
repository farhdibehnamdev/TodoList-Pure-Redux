import store from "../redux/store/index.js";
import { addTask } from "../redux/actions/index.js";
import { generatedId } from "../libs/utils.js";

(function () {
  let submitHandler = function (event) {
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

    store.dispatch(addTask(id, newTask));

    task.value = "";
    task.focus();
  };
  document.addEventListener("submit", submitHandler, false);
})();

export const TaskViewComponent = function () {
  let state = store.getState();
  let html = "";
  const flatData = _.values(state);
  let taskList = flatData.map((data, index) => {
    return _.values(data).map((tsk) => {
      const { id, task } = tsk;
      return `
    <li class="task" data-id=${task.id}>
         <p class="has-task">
           <span class="check-task-name">
             <i class="ph-circle-bold icon-task-size"></i>
             <span>${task.title}</span>
           </span>
           <span class="important-task">
             <i class="ph-star-bold icon-task-size"></i>
           </span>
         </p>
       </li>
       `;
    });
  });

  if (taskList.length > 0) {
    let joined = taskList.join("").replaceAll(",", "");
    html += `<ul class="tasks"> ${joined} </ul>`;
  }

  return html;
};
