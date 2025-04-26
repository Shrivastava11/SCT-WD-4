let lists = [];

function createList() {
  const name = document.getElementById("newListName").value.trim();
  if (!name) return;

  const list = {
    id: Date.now(),
    name,
    tasks: []
  };
  lists.push(list);
  document.getElementById("newListName").value = '';
  renderLists();
}

function addTask(listId) {
  const descInput = document.getElementById(`desc-${listId}`);
  const dateInput = document.getElementById(`date-${listId}`);
  const desc = descInput.value.trim();
  const date = dateInput.value;

  if (!desc) return;

  const task = {
    id: Date.now(),
    description: desc,
    completed: false,
    due: date
  };

  const list = lists.find(l => l.id === listId);
  list.tasks.push(task);

  descInput.value = '';
  dateInput.value = '';
  renderLists();
}

function toggleComplete(listId, taskId) {
  const list = lists.find(l => l.id === listId);
  const task = list.tasks.find(t => t.id === taskId);
  task.completed = !task.completed;
  renderLists();
}

function deleteTask(listId, taskId) {
  const list = lists.find(l => l.id === listId);
  list.tasks = list.tasks.filter(t => t.id !== taskId);
  renderLists();
}

function editTask(listId, taskId) {
  const newDesc = prompt("Edit task:");
  if (!newDesc) return;

  const list = lists.find(l => l.id === listId);
  const task = list.tasks.find(t => t.id === taskId);
  task.description = newDesc;
  renderLists();
}

function renderLists() {
  const container = document.getElementById("listsContainer");
  container.innerHTML = '';

  lists.forEach(list => {
    const div = document.createElement("div");
    div.className = "list";
    div.innerHTML = `
      <h3>${list.name}</h3>
      <div class="add-task">
        <input type="text" id="desc-${list.id}" placeholder="Task description" />
        <input type="datetime-local" id="date-${list.id}" />
        <button onclick="addTask(${list.id})">Add Task</button>
      </div>
      <div class="tasks">
        ${list.tasks.map(task => `
          <div class="task ${task.completed ? 'completed' : ''}">
            <strong>${task.description}</strong><br/>
            <small>Due: ${task.due || 'No date'}</small><br/>
            <button onclick="toggleComplete(${list.id}, ${task.id})">
              ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onclick="editTask(${list.id}, ${task.id})">Edit</button>
            <button onclick="deleteTask(${list.id}, ${task.id})">Delete</button>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(div);
  });
}
