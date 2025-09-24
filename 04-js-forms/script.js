const tasks = [];

const form = document.querySelector("#task-form");
const nameInput = document.querySelector("#task-name");
const priorityInput = document.querySelector("#task-priority");
const dateInput = document.querySelector("#task-date");
const typeInput = document.querySelector("#task-type");
const urgentInput = document.querySelector("#task-urgent");
const errorDiv = document.querySelector("#error");
const taskList = document.querySelector("#task-list");

const focusBtn = document.getElementById("focus-btn");
const randomBgBtn = document.getElementById("random-bg-btn");
const titleBtn = document.getElementById("title-btn");
const title = document.getElementById("main-title");
const logArea = document.getElementById("log-area");
let focusOn = false;

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${task.name}</strong> 
      (Priority: ${task.priority}, ${task.type}, Due: ${task.date})
      ${task.urgent ? " Urgent!" : ""}
    `;


    li.addEventListener("click", () => {

        li.classList.toggle("highlight");
    });


    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorDiv.textContent = "";

  const name = nameInput.value.trim();
  const priority = Number(priorityInput.value);
  const date = dateInput.value;
  const type = typeInput.value;
  const urgent = urgentInput.checked;

  
  if (!name || !priority || !date || !type) {
    errorDiv.textContent = "Please fill out all fields.";
    return;
  }
  if (name.length < 3) {
    errorDiv.textContent = "Task name must be at least 3 characters.";
    return;
  }
  if (priority < 1 || priority > 10) {
    errorDiv.textContent = "Priority must be between 1 and 10.";
    return;
  }


  const newTask = { name, priority, date, type, urgent };
  tasks.push(newTask);

  renderTasks();
  form.reset();
});


function toggleFocus() {
  focusOn = !focusOn;
  if (focusOn) {
    document.body.style.background = "#e0f7fa";
    document.body.style.color = "#004d40";
    title.textContent = "Focus Mode: ON";
    log("Focus mode activated", "#00796b");
  } else {
    document.body.style.background = "orange";
    document.body.style.color = "#fff";
    title.textContent = "ADHD Study Task Collector";
    log("Focus mode deactivated", "#d32f2f");
  }
}


function randomBackground() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = randomColor;
}


function changeTitle() {
  title.textContent = "Stay LOCKED IN with NODHD";
}


function log(msg, color) {
  const p = document.createElement("p");
  p.textContent = msg;
  p.style.color = color;
  logArea.appendChild(p);
}


focusBtn.addEventListener("click", toggleFocus);
randomBgBtn.addEventListener("click", randomBackground);
titleBtn.addEventListener("click", changeTitle);

renderTasks();
