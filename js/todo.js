const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");

// STATE
const todos = [{value: "Reading book"}, {value: "Play football"}];

const todos2 = [];

// RENDERING
const render = () => {
  list.innerHTML = "";
  for (let element of todos) {
    list.innerHTML += `<li class="todo">
        <input value="${element.value}" class="todo_input" type="text" />
        <div class="edit">
          <i class="bx bx-sm bxs-pencil"></i>
        </div>
        <div class="delete">
          <i class="bx bx-sm bx-trash"></i>
        </div>
    </li>`;
  }
}; 

render();

clear.addEventListener("click", () => {
  list.innerHTML = "";
  todos.length = 0;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target["todo"].value;
  const newTodo = {value: inputValue, id: Date.now() + "#"};
  todos.unshift(newTodo);
  render();
});





















//   inputValue = "";

// const a = () => {
//   inputE.placeholder="Text input"
// }

