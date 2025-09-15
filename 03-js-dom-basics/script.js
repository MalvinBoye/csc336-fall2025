
const noteInput = document.getElementById("note-input");
const addBtn = document.getElementById("add-btn");
const notesList = document.getElementById("notes-list");
const focusBtn = document.getElementById("focus-btn");
const randomBgBtn = document.getElementById("random-bg-btn");
const titleBtn = document.getElementById("title-btn");
const toggleHelpBtn = document.getElementById("toggle-help-btn");
const title = document.getElementById("main-title");
const instructions = document.getElementById("instructions");
const logArea = document.getElementById("log-area");

let focusOn = false;

function addNote() {
  const text = noteInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  
  li.addEventListener("click", () => {
    li.classList.toggle("highlight");
  });

 
  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent highlight toggle
    li.remove();
  });

  li.appendChild(delBtn);
  notesList.appendChild(li);
  noteInput.value = "";
}


function toggleFocus() {
  focusOn = !focusOn;
  if (focusOn) {
    document.body.style.background = "#e0f7fa";
    document.body.style.color = "#004d40";
    title.textContent = "Focus Mode: ON";
    log("Focus mode activated ", "#00796b");
  } else {
    document.body.style.background = "orange";
    document.body.style.color = "#fff";
    title.textContent = "ADHD Notes App Prototype";
    log("Focus mode deactivated ", "#d32f2f");
  }
}


function randomBackground() {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = randomColor;
}


function changeTitle() {
  title.textContent = "Stay LOCKED IN with NODHD ";
}


function toggleHelp() {
  instructions.classList.toggle("hidden");
}


function log(msg, color) {
  const p = document.createElement("p");
  p.textContent = msg;
  p.style.color = color;
  logArea.appendChild(p);
}

addBtn.addEventListener("click", addNote);
focusBtn.addEventListener("click", toggleFocus);
randomBgBtn.addEventListener("click", randomBackground);
titleBtn.addEventListener("click", changeTitle);
toggleHelpBtn.addEventListener("click", toggleHelp);