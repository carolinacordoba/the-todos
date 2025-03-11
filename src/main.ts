import { Todo } from "./models/Todo";
import "./scss/style.scss";

let ul = document.getElementById("todosList");

const loadTodos = (): Todo[] => {
  const storeTodos = localStorage.getItem("todoList");
  if (storeTodos) {
    return JSON.parse(storeTodos);
  }
  return [];
};

let todoList: Todo[] = loadTodos();

if (todoList.length === 0) {
  const uluwatu: Todo = new Todo(false, "Uluwatu Temple");
  const tegallalang: Todo = new Todo(false, "Tegallalang Rice Terraces");
  const nusa: Todo = new Todo(false, "Nusa Penida Island");
  todoList = [uluwatu, tegallalang, nusa];

  localStorage.setItem("todoList", JSON.stringify(todoList));
}

const createHTML = (): void => {
  if (ul) {
    ul.innerHTML = "";
  }

  const sortButton = document.getElementById("sortButton");
  sortButton?.addEventListener("click", () => {
    todoList.sort((adventureOne, adventureTwo) =>
      adventureOne.todo.localeCompare(adventureTwo.todo, undefined, {
        sensitivity: "base",
      })
    );
    createHTML();
  });

  for (let i: number = 0; i < todoList.length; i++) {
    //Skapa HTML
    const list: HTMLLIElement = document.createElement("li");
    list.className = "listStyle";

    const check: HTMLInputElement = document.createElement("input");
    check.type = "checkbox";
    check.checked = todoList[i].done;
    check.addEventListener("change", () => {
      todoList[i].done = check.checked;
      localStorage.setItem("todoList", JSON.stringify(todoList));
      createHTML();
    });

    const text: HTMLParagraphElement = document.createElement("p");
    text.innerHTML = todoList[i].todo;
    if (todoList[i].done) {
      text.className = "checked";
      console.log(todoList);
    }

    const icon: HTMLSpanElement = document.createElement("span");
    icon.className = "fa-solid fa-trash-can";
    icon.addEventListener("click", () => {
      todoList.splice(i, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      createHTML();
    });

    //Placera HTML
    list.appendChild(check);
    list.appendChild(text);
    list.appendChild(icon);

    ul?.appendChild(list);
  }
};

createHTML();

document.getElementById("todosForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const todosText = document.getElementById("todosText") as HTMLInputElement;
  const todosValue = todosText.value;

  if (todosValue) {
    const newTodo = new Todo(false, todosValue);

    todosText.value = "";

    todoList.push(newTodo);

    localStorage.setItem("todoList", JSON.stringify(todoList));

    createHTML();
  }
});

createHTML();
