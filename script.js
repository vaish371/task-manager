// ✅ Replace with your actual FastAPI base URL if different
const API_URL = "http://localhost:5000/tasks";

async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input value="${task.title}" onchange="editTask(${task.id}, this.value)" />
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });

  input.value = "";
  loadTasks();
}

async function editTask(id, newTitle) {
  await fetch(`${API_URL}${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle })
  });

  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

// 🔁 Load tasks when the page starts
loadTasks();
