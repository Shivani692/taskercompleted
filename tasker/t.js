document.addEventListener('DOMContentLoaded', loadTasks);

let currentTask = null;

function highlight(element) {
    const items = document.querySelectorAll('.white li');
    items.forEach(item => item.classList.remove('highlight'));
    element.classList.add('highlight');
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll('.task-item');
    tasks.forEach(task => {
        task.style.display = 'flex';
        const isCompleted = task.classList.contains('completed');
        if (filter === 'done' && !isCompleted) {
            task.style.display = 'none';
        } else if (filter === 'notdone' && isCompleted) {
            task.style.display = 'none';
        }
    });
}

function cate() {
    const categoryDropdown = document.getElementById('categoryDropdown');
    if (categoryDropdown.value === 'add') {
        const newCategory = prompt('Enter new category:');
        if (newCategory) {
            const option = document.createElement('option');
            option.value = newCategory.toLowerCase();
            option.textContent = newCategory;
            categoryDropdown.appendChild(option);
            categoryDropdown.value = newCategory.toLowerCase();
        }
    }
}

function showAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'block';
}

function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const taskCategory = document.getElementById('taskCategory').value;

    if (taskName.trim() === '') {
        alert('Please enter a task name.');
        return;
    }

    const task = {
        id: Date.now().toString(),
        name: taskName,
        category: taskCategory,
        completed: false
    };

    saveTaskToLocalStorage(task);
    appendTaskToDOM(task);

    closeAddTaskModal();
    document.getElementById('taskName').value = '';
    document.getElementById('taskCategory').value = 'none';
}

function filterTasksByCategory() {
    const selectedCategory = document.getElementById('categoryDropdown').value;
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach(task => {
        if (selectedCategory === 'all' || task.getAttribute('data-category') === selectedCategory) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}

function toggleTaskCompletion(checkbox) {
    const taskItem = checkbox.closest('.task-item');
    const taskId = taskItem.getAttribute('data-id');
    taskItem.classList.toggle('completed');

    const tasks = getTasksFromLocalStorage();
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasksToLocalStorage(tasks);
}

function deleteTask(deleteIcon) {
    const taskItem = deleteIcon.closest('.task-item');
    const taskId = taskItem.getAttribute('data-id');
    taskItem.remove();

    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(tasks);
}

function editTask(editIcon) {
    currentTask = editIcon.closest('.task-item');
    const taskName = currentTask.querySelector('h3').innerText;
    const taskCategory = currentTask.getAttribute('data-category');

    document.getElementById('editTaskName').value = taskName;
    document.getElementById('editTaskCategory').value = taskCategory;

    document.getElementById('editTaskModal').style.display = 'block';
}

function closeEditTaskModal() {
    document.getElementById('editTaskModal').style.display = 'none';
}

function saveTask() {
    if (currentTask) {
        const newTaskName = document.getElementById('editTaskName').value;
        const newTaskCategory = document.getElementById('editTaskCategory').value;
        const taskId = currentTask.getAttribute('data-id');

        const tasks = getTasksFromLocalStorage();
        const task = tasks.find(task => task.id === taskId);
        task.name = newTaskName;
        task.category = newTaskCategory;

        currentTask.querySelector('h3').innerText = newTaskName;
        currentTask.setAttribute('data-category', newTaskCategory);
        currentTask.querySelector('.red p').innerText = newTaskCategory.charAt(0).toUpperCase() + newTaskCategory.slice(1);

        saveTasksToLocalStorage(tasks);
        closeEditTaskModal();
        currentTask = null;
    }
}

function saveTaskToLocalStorage(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => appendTaskToDOM(task));
}

function appendTaskToDOM(task) {
    const taskList = document.getElementById('taskList');

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item');
    taskItem.setAttribute('data-id', task.id);
    taskItem.setAttribute('data-category', task.category);
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
        <input type="radio" name="taskStatus" ${task.completed ? 'checked' : ''} onclick="toggleTaskCompletion(this)">
        <div class="bar"></div>
        <h3>${task.name}</h3>
        <div class="red">
            <p>${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</p>
        </div>
        <div class="del">
            <img src="[removal.ai]_006f29cf-4d74-4499-8663-564839c144d1-images.png" class="edit" alt="edit" onclick="editTask(this)">
            <img src="Removal-759.png" class="de" alt="delete" onclick="deleteTask(this)">
        </div>
    `;

    taskList.appendChild(taskItem);
}
