document.addEventListener("DOMContentLoaded", function() {
  const API = 'http://localhost:3000/todos';
  const inputTask = document.getElementById('inputTask');
  const btnAdd = document.getElementById('btnAdd');
  const inputSearch = document.getElementById('inputSearch');
  const taskList = document.getElementById('taskList');
  const counter = document.getElementById('counter');
  const btnDark = document.getElementById('btnDark');
  const filterBtns = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  function loadDarkMode() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.documentElement.classList.add('dark');
      btnDark.textContent = 'Light mode';
    }
  }

  function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    btnDark.textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  function saveSession() {
    sessionStorage.setItem('filter', activeFilter);
    sessionStorage.setItem('search', inputSearch.value);
  }

  function loadSession() {
    activeFilter = sessionStorage.getItem('filter') || 'all';
    inputSearch.value = sessionStorage.getItem('search') || '';
    updateFilterButtons();
  }

  function updateFilterButtons() {
    filterBtns.forEach(function(btn) {
      const isActive = btn.dataset.filter === activeFilter;
      btn.className = 'filter-btn flex-1 py-2 rounded-lg text-sm font-semibold transition ' + (isActive ? 'bg-blue-900 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white');
    });
  }

  async function getTasks() {
    const res = await fetch(API);
    return await res.json();
  }

  async function postTask(title) {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, completed: false })
    });
  }

  async function patchTask(id, completed) {
    await fetch(API + '/' + id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: completed })
    });
  }

  async function deleteTask(id) {
    await fetch(API + '/' + id, { method: 'DELETE' });
  }

  async function render() {
    const tasks = await getTasks();
    const search = inputSearch.value.toLowerCase();

    let filtered = tasks.filter(function(t) {
      if (activeFilter === 'pending') return !t.completed;
      if (activeFilter === 'completed') return t.completed;
      return true;
    });

    if (search) {
      filtered = filtered.filter(function(t) {
        return t.title.toLowerCase().includes(search);
      });
    }

    taskList.innerHTML = '';

    if (filtered.length === 0) {
      taskList.innerHTML = '<div class="text-center text-gray-400 dark:text-gray-500 py-10">No tasks to show</div>';
      counter.textContent = '';
      return;
    }

    filtered.forEach(function(task) {
      const div = document.createElement('div');
      div.className = 'flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow px-5 py-4 mb-2';
      const checked = task.completed ? 'checked' : '';
      const strike = task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white';
      div.innerHTML =
        '<div class="flex items-center gap-3">' +
          '<input type="checkbox" ' + checked + ' class="w-5 h-5 accent-cyan-500 cursor-pointer" data-id="' + task.id + '" />' +
          '<span class="font-medium ' + strike + '">' + task.title + '</span>' +
        '</div>' +
        '<button data-id="' + task.id + '" class="btn-delete bg-red-500 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-lg transition">Delete</button>';
      taskList.appendChild(div);
    });

    const done = tasks.filter(function(t) { return t.completed; }).length;
    counter.textContent = done + ' of ' + tasks.length + ' tasks completed';

    document.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
      cb.addEventListener('change', async function(e) {
        await patchTask(e.target.dataset.id, e.target.checked);
        await render();
      });
    });

    document.querySelectorAll('.btn-delete').forEach(function(btn) {
      btn.addEventListener('click', async function(e) {
        await deleteTask(e.target.dataset.id);
        await render();
      });
    });
  }

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', async function() {
      activeFilter = btn.dataset.filter;
      updateFilterButtons();
      saveSession();
      await render();
    });
  });

  btnAdd.addEventListener('click', async function() {
    const title = inputTask.value.trim();
    if (!title) return;
    await postTask(title);
    inputTask.value = '';
    await render();
  });

  inputTask.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') btnAdd.click();
  });

  inputSearch.addEventListener('input', async function() {
    saveSession();
    await render();
  });

  btnDark.addEventListener('click', toggleDarkMode);

  loadDarkMode();
  loadSession();
  render();
});