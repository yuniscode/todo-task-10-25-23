const addTodoBtn = document.querySelector(".add-todo-btn");
const createTodoForm = document.querySelector(".create-todo");
const todoList = document.querySelector(".todo-list");
const todoInput = document.getElementById("todo-input");
const errorMsg = document.querySelector(".error-msg");
const displayInfoEl = document.querySelector(".display-info");
const clearAllBtn = document.querySelector(".display-info button");

displayInfo();
const todosArr = new Array();

createTodoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (todoInput.value.trim() === "") {
    errorMsg.classList.add("active");
    return;
  } else {
    errorMsg.classList.remove("active");
  }

  const newTodo = {
    id: Math.random() * 10,
    value: todoInput.value,
  };

  todosArr.push(newTodo);
  const listElement = document.createElement("li");
  listElement.innerHTML = `${todoInput.value}<button><i class="fa-solid fa-trash"></i></button>`;
  todoList.appendChild(listElement);

  displayInfo(todosArr);

  const deleteTodoBtn = listElement.querySelector("button");

  deleteTodoBtn.addEventListener("click", () => {
    if (window.confirm("Are you sure to delete ?")) {
      listElement.remove();

      const index = todosArr.findIndex((todo) => todo.id === newTodo.id);

      if (index !== -1) {
        todosArr.splice(index, 1);
        displayInfo(todosArr);
      }
    }
  });

  todoInput.value = "";
});

function displayInfo(arr = []) {
  const displayParagraph = displayInfoEl.querySelector("p");

  displayParagraph.innerText = `You have ${arr.length} pending tasks`;

  if (arr.length === 0) {
    displayParagraph.innerText = "No todo Item";
  }
}

clearAllBtn.addEventListener("click", () => {
  const childrens = todoList.children;

  if (childrens.length === 0) {
    alert("Hec bir todo elementiniz yoxdur.");
  }

  for (let i = childrens.length - 1; i >= 0; --i) {
    childrens[i].remove();
  }

  todosArr.length = 0;
  displayInfo();
});

