const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");
const select = document.querySelector(".select");


// STATE
let todos = [{value: "Reading book", id: "a11", isDone: false, edit: false}, 
            {value: "Play football", id: "a22", isDone: false, edit: false}];

let status = "all";

const filterTodosByStatus = (status, todos) => {
  switch (status) {
    case "complete": 
      return todos.filter((v) => v.isDone);
    case "proccess": 
      return todos.filter((v) => !v.isDone);
    default : 
      return todos;
  }
};

// RENDERING
const render = () => {
  list.innerHTML = "";
  filterTodosByStatus(status, todos).forEach((element, index) => {
    const checkbox = element.isDone;
    const edit = element.edit;

    list.innerHTML += `
      <li class="todo" id="${element.id}">
        <div class="step">
          <p>${index + 1}<p/>
        </div>  
        <input onclick="onCheck('${element.id}');" ${checkbox == true ? "checked" : ""} type="checkbox" />
        <input id='${"s" + element.id}' value="${element.value}" ${edit == false ? "disabled" : ""} class='todo_input ${checkbox == true ? 'chek' : ''}' type="text" />
        <div class="save">
          <i onclick="onSave('${element.id}');" class="bx bx-sm bxs-save"></i>
        </div>
        <div class="cencel">
          <i onclick="onCencel('${element.id}');" class="bx bx-sm bx-x"></i>
        </div>
        <div class="edit">
          <i onclick="onEdit('${element.id}')" class="bx bx-sm bxs-pencil"></i>
        </div>
        <div class="delete">
          <i onclick="deleteTodo('${element.id}');" class="bx bx-sm bx-trash"></i>
        </div>
      </li>`;
  })
}; 

render();

// onCheck button 
function onCheck(id) {
  todos = todos.map((v) => (v.id == id ? {...v, isDone: !v.isDone} : v));
  render();
};

// click edit button
const onEdit = (id) => {

  const getButton = (id, className) => 
    document.querySelector(`#${id} .${className}`);

  const saveButton = getButton(id, "save");
  const cencelButton = getButton(id, "cencel");
  const editButton = getButton(id, "edit");
  const trashButton = getButton(id, "delete");
  const onDisabled = getButton(id, "todo_input")

  saveButton.style.display = "block";
  cencelButton.style.display = "block";
  editButton.style.display = "none";
  trashButton.style.display = "none";
  onDisabled.removeAttribute("disabled");
};

// click cencel button
const onCencel = (id) => {
  
  const getButton = (id, className) => 
    document.querySelector(`#${id} .${className}`);

  const saveButton = getButton(id, "save");
  const cencelButton = getButton(id, "cencel");
  const editButton = getButton(id, "edit");
  const trashButton = getButton(id, "delete");
  const onDisabled = getButton(id, "todo_input")

  saveButton.style.display = "none";
  cencelButton.style.display = "none";
  editButton.style.display = "block";
  trashButton.style.display = "block";
  onDisabled.disabled = true;
  render();
};

// click onSave button
const onSave = (id) => {
  let inputTagValue = document.querySelector(`${"#s" + id}`);
  if (inputTagValue.value == "") {
    render();
    alert("Xato");
  } else {
    todos = todos.map((v) => (v.id == id ? {...v, value : inputTagValue.value} : v));
  }
  render();
  // console.log(inputTagValue.value);
};


// Action Trash, delete to do list
function deleteTodo(id) {
  todos = todos.filter(v => v.id != id);
  render();
};

// Event  Clear all
clear.addEventListener("click", () => {
  todos = [];
  render();
});


// if input null
function inputHasNull() {
  input.style.transform = `rotate(4deg)`;
  setTimeout(inputHasNull1, 30); 
};

function inputHasNull1() {
  input.style.transform = `rotate(-3deg)`;
  setTimeout(inputHasNull2, 50); 
};

function inputHasNull2() {
  input.style.transform = `rotate(2deg)`;
  setTimeout(inputHasNull3, 50); 
}

function inputHasNull3() {
  input.style.transform = `rotate(-1deg)`;
  setTimeout(inputHasNull4, 50); 
}

function inputHasNull4() {
  input.style.transform = `rotate(0deg)`;
}


// click submit then create lists
form.addEventListener("submit", (event) => {
  
  todos.map(el=> {if (el.value == event.target["todo"].value) {
    alert("Xato")
  } })

  event.preventDefault();
  if (event.target["todo"].value == "") {
    inputHasNull();
  } else {
    const inputValue = event.target["todo"].value;
    const newTodo = {value: inputValue, id: "a" + Date.now(), isDone: false, edit: false};
    todos.unshift(newTodo);
    event.target["todo"].value = null;
    render();
  }
});


// filter by status
select.addEventListener("change", (event) => {
  status = event.target.value;
  render();
});


// Drag end drop
const dragArea = document.querySelector(".todosList");

new Sortable(dragArea, {
  animation: 150
});








//   Desktop  Moon

let moonIcon = document.querySelector('.iconMoon img');
let animation = document.querySelector('.animation');

moonIcon.onclick = function() {
  animation.style.background = 'none';
  document.body.classList.toggle('dark-theme');
  if(document.body.classList.contains('dark-theme')){
      moonIcon.src = './img/sun.png';
  } else {
      moonIcon.src = './img/moon.png';
  }
};


//   Animation 
let animationCheck = document.querySelector('.animationcheck');

animationCheck.onclick = function() {
  // document.body.classList.toggle(' ');
  animation.style.background = 'linear-gradient(45deg, #d2001a, #7462ff, #f48e21, #23d5ab)';
  animation.style.backgroundSize = '300% 300%';
};




// ---------------   toggle style switcher -----------------

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
const colors = document.querySelector(".colors");

let count = 0;

styleSwitcherToggler.addEventListener("click", () => {
  // document.querySelector(".style-switcher").classList.toggle("open");
  
  if (count === 0) {
        count = 1
        setTimeout(colors.style.display = 'flex', 1130); 
        // colors.style.display = 'flex';
        colors.style.zIndex = '0';
        colors.style.transform = 'translateX(-20px)';
    } else {
        count--
        setTimeout(colors.style.display = 'none', 1130); 
        colors.style.zIndex = '-1';
        colors.style.transform = 'translateX(-48px)';
    }
})




// Theme colors switcher

const alternateStyle = document.querySelectorAll(".alternate-style")

function setActiveStyle(color) {
  alternateStyle.forEach((style) => {
    if(color === style.getAttribute('title')) {
      style.removeAttribute("disabled");
    }
    else {
      style.setAttribute("disabled", "true");
    }
  });
};















// O'rganish

// let arr = ["w", 1, 2, 3, "P"];

// let result = arr.map((e, i, arr) => {
//   return e = "salom";
// })

// console.log(arr);
// console.log(result);


