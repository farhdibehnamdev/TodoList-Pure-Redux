const generatedId = function () {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
};
const init = function () {
  console.log(generatedId());
  let data = {};
  return function () {
    let template = function () {
      let html = "";

      const flatData = _.values(data);
      let taskList = flatData.map((data, index) => {
        return _.values(data).map((task) => {
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

      if (taskList.length > 0)
        html += `<ul class="tasks"> ${taskList.join("")} </ul>`;

      return html;
    };

    let emitEvent = function (elem, detail) {
      let event = new CustomEvent("render", {
        bubbles: true,
        cancelable: true,
        detail: detail || {},
      });
      elem.dispatchEvent(event);
    };

    let render = function () {
      let app = document.querySelector("#app");
      if (!app) return;
      app.innerHTML = template();
      emitEvent(app, data);
    };

    let submitHandler = function (event) {
      if (!event.target.matches("#add-task-input")) return;
      event.preventDefault();

      let task = event.target.querySelector(".task-input");
      if (!task || task.value.length < 1) return;

      // data.tasks.push(task.value);
      const id = generatedId();
      const newTask = {
        [id]: {
          id,
          title: task.value,
          createdDate: Date.now(),
          important: false,
          completed: false,
          isOverDated: false,
          planned: false,
          myDay: false,
        },
      };

      data = { ...data, [id]: newTask };

      // Object.assign(data.tasks, task.value);
      render();

      task.value = "";
      task.focus();
    };

    document.addEventListener("submit", submitHandler, false);
    // document.addEventListener("render", renderHandler, false);
  };
};
const render = init();
render();
