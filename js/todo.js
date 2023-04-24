const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");

// STATE
let todos = [{value: "Reading book", id: "11", isDone: false, edit: false}, 
            {value: "Play football", id: "22", isDone: true, edit: true}];

// RENDERING
const render = () => {
  list.innerHTML = "";
  for (let element of todos) {
    const checkbox = element.isDone;
    const edit = element.edit;

    // console.log(checkbox);

    list.innerHTML += `
      <li class="todo">
        <input onclick="onCheck('${element.id}');" ${checkbox == true ? "checked" : ""} type="checkbox" />
        <input value="${element.value}" ${edit == false ? "readonly" : ""} class="todo_input" type="text" />
        <div class="edit">
          <i onclick="editing('${element.id}');" class="bx bx-sm bxs-pencil"></i>
        </div>
        <div class="delete">
          <i onclick="deleteTodo('${element.id}');" class="bx bx-sm bx-trash"></i>
        </div>
      </li>`;
  }
}; 

render();

// onCheck button 
function onCheck(id) {
  todos = todos.map((v) => (v.id == id ? {...v, isDone: !v.isDone} : v));
  render();
  // console.log("chek", todos);
};

// Edit button   
// let a = 0;
// function editing(id) {
//   if (a == 0) {
//     todos = todos.map((v) => (v.id == id ? {...v, edit: !v.edit} : v));
//     render();
//     console.log("idGet", id, todos);
//     ++a;
//   } else {
//     if (todos.id == id) {

//     }
//     todos = todos.map((v) => (v.id == id ? {...v, edit: !v.edit} : v));
//     render();
//     --a;
//   }
// };

// Action Trash, delete to do list
function deleteTodo(id) {
  todos = todos.filter(v => v.id != id);
  render();
}

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
  event.preventDefault();
  if (event.target["todo"].value == "") {
    inputHasNull();
  } else {
    const inputValue = event.target["todo"].value;
    const newTodo = {value: inputValue, id: Date.now() + "#", isDone: false, edit: false};
    todos.unshift(newTodo);
    event.target["todo"].value = null;
    render();
  }
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

}















// ---------------   toggle style switcher -----------------

const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
const colors = document.querySelector(".colors");

let count = 0;

styleSwitcherToggler.addEventListener("click", () => {
  // document.querySelector(".style-switcher").classList.toggle("open");
  
  if (count === 0) {
        count = 1
        colors.style.zIndex = '0';
        colors.style.transform = 'translateY(0)';
        // document.querySelector(".color-5").style.display = 'block';
        // document.querySelector(".style-switcher img").style.marginTop = '3px';
    } else {
        count--
        colors.style.zIndex = '-1';

        colors.style.transform = 'translateY(-48px)';
        // document.querySelector(".color-5").style.display = 'none';
        // document.querySelector(".style-switcher img").style.marginTop = '23px';
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



