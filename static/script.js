const API_URL = "http://localhost:3000/todo";

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoDetails = document.getElementById("todo-details");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = todoInput.value.trim();
  const details = todoDetails.value.trim();
  if (title && details) {
    const todo = { title, description: details, status: "active" };
    await createTodo(todo);
    todoInput.value = "";
    loadTodos();
  }
});

async function loadTodos() {
  const todos = await fetchTodos();
  renderTodos(todos);
}

async function fetchTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  //   console.log(todos.result);
  return todos.result;
}

function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const todoElement = createTodoElement(todo);
    todoList.appendChild(todoElement);
  });
}

function createTodoElement(todo) {
  const div = document.createElement("div");
  div.classList.add("todo");

  const span = document.createElement("span");
  span.textContent = todo.title;
  if (todo.status === "inactive") {
    span.classList.add("inactive");
  }
  div.appendChild(span);

  const buttonContainer = document.createElement("div");

  const toggleButton = document.createElement("button");
  toggleButton.textContent = todo.status === "active" ? "Inactive" : "Active";
  toggleButton.addEventListener("click", () => toggleCompleted(todo._id));
  buttonContainer.appendChild(toggleButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTodo(todo._id));
  buttonContainer.appendChild(deleteButton);

  div.appendChild(buttonContainer);

  return div;
}

async function createTodo(todo) {
  try {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
}

async function toggleCompleted(id) {
  const todo = await getTodo(id);
  const updatedTodo = {
    ...todo.result,
    status: todo.result.status === "active" ? "inactive" : "active",
  };
  await updateTodo(updatedTodo);
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
}

async function getTodo(id) {
  const response = await fetch(`${API_URL}/${id}`);
  const todo = await response.json();
  return todo;
}

async function updateTodo(todo) {
  await fetch(`${API_URL}/${todo._id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: { "Content-Type": "application/json" },
  });
}

loadTodos();
