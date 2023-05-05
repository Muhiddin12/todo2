const form = document.querySelector(".form");
const list = document.querySelector(".todosList");
const clear = document.querySelector(".clear");
const input = document.querySelector(".input");
const select = document.querySelector(".select");
const empty = document.querySelector(".empty");

// STATE
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// let todos = [{value: "Reading book", id: "a11", isDone: false, edit: false}, 
//             {value: "Play football", id: "a22", isDone: false, edit: false}];

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
  localStorage.setItem("todos", JSON.stringify(todos));
  list.innerHTML = "";
  filterTodosByStatus(status, todos).forEach((element, index) => {
    const checkbox = element.isDone;
    const edit = element.edit;

    list.innerHTML += `
      <li class="todo" id="${element.id}" draggable="true">
        <div class="number ${checkbox == true ? 'liCheck' : ''}">
          <p>${index + 1}</p>
        </div>  
        <div class="info ${checkbox == true ? 'liCheck' : ''}">
          <div class="checking">
            <i class='bx bx-check ${checkbox == false ? "chekList" : ""}'></i>
          </div>
          <input value="${element.value}" ${edit == false ? "disabled" : ""} class='todo_input ${checkbox == true ? 'check' : ''}' type="text" />
          <div class="save">
            <i class="bx bx-sm bxs-save"></i>
          </div>
          <div class="cencel">
            <i class="bx bx-sm bx-x"></i>
          </div>
          ${checkbox == true ? "" :  `<div class="edit">
                                        <i class="bx bx-sm bxs-pencil"></i>
                                      </div>`
            }
          <div class="delete">
            <i class="bx bx-sm bx-trash"></i>
          </div>
        </div>  
      </li>`;
  });


const dragElement = document.getElementsByClassName("todo");

let startIndex;
let dropIndex;

  for (let el of dragElement) {
    el.addEventListener("dragstart", (e) => {
      let startId = el.id;
      startIndex = todos.findIndex((v) => startId == v.id);
    });

    el.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    el.addEventListener("dragleave", (e) => {
      e.preventDefault();
    });

    el.addEventListener("drop", (e) => {
      e.preventDefault();
      let dropId = el.id;
      dropIndex = todos.findIndex((v) => dropId == v.id);
    });

    el.addEventListener("dragend", (e) => {
      e.preventDefault();
      let a = todos.splice(startIndex, 1);
      todos.splice(dropIndex, 0, a[0]);
      render();
    });
  };
}; 

render();

const block = document.querySelector(".block");

block.addEventListener("click", (e) => {
  const id = e.target.closest(".todo")?.id;
  
  const getButton = (id, className) => 
  document.querySelector(`#${id} .${className}`);

  const saveButton = getButton(id, "save");
  const cencelButton = getButton(id, "cencel");
  const editButton = getButton(id, "edit");
  const trashButton = getButton(id, "delete");
  const onDisabled = getButton(id, "todo_input")
  const info = getButton(id, "info");

  // Edit button
    if (e.target.closest(".edit")) {
      saveButton.style.display = "block";
      cencelButton.style.display = "block";
      editButton.style.display = "none";
      trashButton.style.display = "none";
      onDisabled.removeAttribute("disabled");  
      info.style.boxShadow = "0 0 8px gold";

      let currentValue = onDisabled.value;
      onDisabled.value = "";
      onDisabled.focus();
      onDisabled.value = currentValue;
    };

  // delete button
    if (e.target.closest(".delete")) {
      todos = todos.filter(v => v.id != id);
      render();           
    };

  // save button 
  if (e.target.closest(".save")) {
    const currentClass = document.querySelector(`#${id} .todo_input`);

    if (currentClass.value == "") {
      alert("Xato !");
    } else {
      todos = todos.map((v) => (v.id == id ? {...v, value: currentClass.value} : v));
      saveButton.style.display = "none";
      cencelButton.style.display = "none";
      editButton.style.display = "block";
      trashButton.style.display = "block";
      onDisabled.disabled = true;
    }
    render();
  };
    
  // cencel button
  if (e.target.closest(".cencel")) {
    saveButton.style.display = "none";
    cencelButton.style.display = "none";
    editButton.style.display = "block";
    trashButton.style.display = "block";
    onDisabled.disabled = true;
    render();
  };

  // clear all
  if (e.target.closest(".clear")) {
    todos = [];
    render();
    empty.style.display = "block";
  };

  // onCheck button 
  if (e.target.closest(".checking")) {
    todos = todos.map((v) => (v.id == id ? {...v, isDone: !v.isDone} : v));
    render();
  };
});


// add empty input
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
  empty.style.display = "none";
  const findTodo = todos.find((el) => el.value == event.target['todo'].value);

  if (findTodo) {
    inputHasNull();
    alert('Bunday matn kiritilgan !')
  } else {
    if (event.target["todo"].value == "") {
      inputHasNull();
    } else {
      const inputValue = event.target["todo"].value;
      const newTodo = {value: inputValue, id: "a" + Date.now(), isDone: false, edit: false};
      todos.unshift(newTodo);
      event.target["todo"].value = null;
      render();
    }
  }
});


// filter by status
select.addEventListener("change", (event) => {
  status = event.target.value;
  render();
});

