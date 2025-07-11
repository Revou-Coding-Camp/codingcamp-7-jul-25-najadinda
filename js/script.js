const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addBtn = document.getElementById('addBtn');
const todoBody = document.getElementById('todoBody');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterSelect = document.getElementById('filterSelect');

let todos = [];
let currentFilter = 'all';

function renderTodos() {
  todoBody.innerHTML = '';
  let filteredTodos = todos;

  if (currentFilter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else if (currentFilter === 'pending') {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (filteredTodos.length === 0) {
    todoBody.innerHTML = '<tr><td colspan="4" class="text-center py-4 text-gray-500">No task found</td></tr>';
    return;
  }

  filteredTodos.forEach((todo, index) => {
    const realIndex = todos.indexOf(todo);
    const row = document.createElement('tr');
    row.className = "border-b border-gray-200 hover:bg-gray-100";

    row.innerHTML = `
      <td class="py-3 px-6">
        ${todo.editing ? `<input type="text" id="editTask${realIndex}" value="${todo.task}" class="border rounded px-2 py-1 w-full">` : todo.task}
      </td>
      <td class="py-3 px-6">
        ${todo.editing ? `<input type="date" id="editDate${realIndex}" value="${todo.date}" class="border rounded px-2 py-1 w-full">` : (todo.date || '-')}
      </td>
      <td class="py-3 px-6">${todo.completed ? 'Completed' : 'Pending'}</td>
      <td class="py-3 px-6 space-x-2">
        ${todo.editing ? `
          <button onclick="saveEdit(${realIndex})" class="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded">Save</button>
          <button onclick="cancelEdit(${realIndex})" class="bg-gray-400 hover:bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
        ` : `
          <button onclick="toggleStatus(${realIndex})" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">Toggle</button>
          <button onclick="editTodo(${realIndex})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">Edit</button>
        `}
        <button onclick="deleteTodo(${realIndex})" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded">Delete</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
}

addBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;
  if (!task) return;

  todos.push({ task, date, completed: false, editing: false });
  taskInput.value = '';
  dateInput.value = '';
  renderTodos();
});

deleteAllBtn.addEventListener('click', () => {
  todos = [];
  renderTodos();
});

filterSelect.addEventListener('change', () => {
  currentFilter = filterSelect.value;
  renderTodos();
});

function toggleStatus(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(index) {
  todos[index].editing = true;
  renderTodos();
}

function saveEdit(index) {
  const newTask = document.getElementById(`editTask${index}`).value;
  const newDate = document.getElementById(`editDate${index}`).value;
  todos[index].task = newTask;
  todos[index].date = newDate;
  todos[index].editing = false;
  renderTodos();
}

function cancelEdit(index) {
  todos[index].editing = false;
  renderTodos();
}

renderTodos();
