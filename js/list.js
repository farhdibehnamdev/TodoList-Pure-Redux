const generateId = function () {
  return Math.random(1, 1000);
};
class List {
  constructor(title, tasks) {
    id = generateId();
    this.title = title;
    this.tasks = tasks;
  }
}
