let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const title = document.getElementById('title').value;
  const deadline = document.getElementById('deadline').value;

  if (!title || !deadline) return;

  const task = {
    title,
    deadline,
    completed: false
  };

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskForm.reset();
});

function renderTasks() {
  tasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
   li.innerHTML = `
  <strong>${task.title}</strong> - Due: ${task.deadline}
  <div>
    <button onclick="toggleComplete(${index})">
      ${task.completed ? "✅" : "Mark Done"}
    </button>
    <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
  </div>
`;


    if (task.completed) {
      li.style.textDecoration = 'line-through';
    }

    tasksList.appendChild(li);
  });

  updateProgress();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percent = total ? (completed / total) * 100 : 0;
  document.getElementById('progress-fill').style.width = `${percent}%`;
}

renderTasks();
