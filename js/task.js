const init = function () {
  const generatedId = function () {
    return (
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    );
  };
  let data = {
    tasks: {
      id: {
        taskId,
        title,
        createdDate,
        important,
        completed,
        isOverDated,
        planned,
        myDay,
        // subTaskId,
      },
    },
  };
  return function () {
    let template = function () {
      let taskList = data.tasks.map((task, index) => {
        console.log(task);
        return `
     <li class="task">
          <p class="has-task">
            <span class="check-task-name">
              <i class="ph-circle-bold icon-task-size"></i>
              <span>${task}</span>
            </span>
            <span class="important-task">
              <i class="ph-star-bold icon-task-size"></i>
            </span>
          </p>
        </li>
        `;
      });

      let html = "";
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
      console.log(event);

      if (!event.target.matches("#add-task-input")) return;
      event.preventDefault();

      let task = event.target.querySelector(".task-input");
      if (!task || task.value.length < 1) return;

      // data.tasks.push(task.value);
      const id = generatedId();
      const newTask = {
        id: {
          id,
          createdDate: Date.now(),
          important: false,
          completed: false,
          isOverDated: false,
          planned: false,
          myDay: false,
        },
      };
      data = { ...data.tasks, [newTask.id]: newTask.id };
      // Object.assign(data.tasks, task.value);
      console.log({ ...data.tasks, newTask });
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
