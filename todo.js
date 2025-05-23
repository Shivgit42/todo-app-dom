const input = document.querySelector(".inp");
const addBtn = document.querySelector(".addButton");
const todoList = document.querySelector(".todos-list-container");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let ctr = todos.length;

//initial render
renderTodos(todos);

const errorMsg = document.querySelector(".error-message");

input.addEventListener("input", () => {
  if (input.value.trim() !== "") {
    errorMsg.style.display = "none";
  }
});

function addTodo() {
  if (input.value.trim() === "") {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  const newTodo = {
    id: "todo-" + ctr,
    title: input.value.trim(),
    isEditing: false,
    isCompleted: false,
  };

  todos.push(newTodo);
  ctr++;
  input.value = "";
  saveTodos();
  renderTodos(todos);
}

function createTodo(todo, index) {
  const container = document.createElement("div");
  container.className = "todo-list";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isCompleted;
  checkbox.className = "checkBox";
  checkbox.addEventListener("change", () => {
    todos[index].isCompleted = checkbox.checked;
    saveTodos();
    renderTodos(todos);
  });

  const title = document.createElement("h3");
  title.className = "todo-heading";
  title.textContent = todo.title;
  if (todo.isCompleted) {
    title.style.textDecoration = "line-through";
    title.style.color = "gray";
  }

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = todo.title;
  editInput.style.display = "none";
  editInput.className = "edit-input";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-button";
  editBtn.textContent = "Edit";

  const saveBtn = document.createElement("button");
  saveBtn.className = "edit-button";
  saveBtn.textContent = "Save";
  saveBtn.style.display = "none";
  saveBtn.style.backgroundColor = "green";

  editBtn.addEventListener("click", () => {
    title.style.display = "none";
    editInput.style.display = "inline-block";
    editBtn.style.display = "none";
    saveBtn.style.display = "inline-block";
  });

  saveBtn.addEventListener("click", () => {
    const newTitle = editInput.value.trim();
    if (newTitle !== "") {
      todos[index].title = newTitle;
      saveTodos();
      renderTodos(todos);
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    saveTodos();
    renderTodos(todos);
  });

  container.appendChild(checkbox);
  container.appendChild(title);
  container.appendChild(editInput);
  container.appendChild(editBtn);
  container.appendChild(saveBtn);
  container.appendChild(deleteBtn);

  return container;
}

function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo, i) => {
    const element = createTodo(todo, i);
    todoList.appendChild(element);
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
