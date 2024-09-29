const todoList = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todoList();
describe("The first test siute", () => {
  beforeAll(() => {
    add({
      title: "Submit assignment",
      dueDate: "2022-07-21",
      completed: false,
    });
    add({
      title: "Pay rent",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: true,
    });
    add({
      title: "Service Vehicle",
      dueDate: new Date().toISOString().slice(0, 10),
      completed: false,
    });
    add({ title: "File taxes", dueDate: "2026-07-26", completed: false });
    add({
      title: "Pay electric bill",
      dueDate: "2026-08-23",
      completed: false,
    });
  });
  test("that checks creating a new todo.", () => {
    add({
      title: "test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(6);
  });
  test("that checks marking a todo as complted.", () => {
    markAsComplete(5);
    expect(all[5].completed).toBe(true);
  });
  test("that checks retrieval of overdue items.", () => {
    const val = overdue();
    expect(val.length).toBe(1);
  });
  test("that checks retrieval of due today items.", () => {
    const val = dueToday();
    expect(val.length).toBe(3);
  });
  test("that checks retrieval of due later items.", () => {
    const val = dueLater();
    expect(val.length).toBe(2);
  });
});
