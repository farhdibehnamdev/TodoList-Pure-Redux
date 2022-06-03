const generateId = function () {
  return Math.random(1, 1000);
};
class Task {
  tasks = [];
  constructor(title, createdDateTask, completed, isOverDated, subTask) {
    this.id = generateId();
    this.title = title;
    this.createdDateTask = createdDateTask;
    this.completed = completed;
    this.isOverDated = isOverDated;
    this.subTask = subTask;
    this.important = this.important;
  }
  addTask() {}
}

const newTask = new Task();
newTask.addTask();
