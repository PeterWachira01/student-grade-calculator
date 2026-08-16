const form = document.getElementById('taskForm');
const input = document.getElementById('taskName');
const description = document.getElementById('taskDescription');
const list = document.getElementById('taskList');
const tasks = [];
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks.push(...JSON.parse(storedTasks));
}

function updateTaskNumbers() {
    const tasks = list.children;

    for (let i = 0; i < tasks.length; i++) {
            tasks[i].querySelector('.task-number').textContent = i + 1;
    }
}

function displayTasks() {
    tasks.forEach((task, index) => {
        displayTask(task, index);
    });
}

function displayTask(task, index) {
    const taskItem = document.createElement('li');
    const taskContent = document.createElement('div');
    const taskHeader = document.createElement('div');
    const buttonGroup = document.createElement('div');
    const taskTitle = document.createElement('h3');
    const taskNumberElement = document.createElement('span');
    const completeButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    buttonGroup.classList.add('button-group');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    taskTitle.textContent = task.name;
    taskContent.textContent = task.description;
    taskNumberElement.textContent = list.children.length + 1;
    taskNumberElement.classList.add('task-number');

    taskHeader.appendChild(taskNumberElement);
    taskHeader.appendChild(taskTitle);

    buttonGroup.appendChild(completeButton);
    buttonGroup.appendChild(deleteButton);

    taskItem.appendChild(taskHeader);
    taskItem.appendChild(taskContent);
    taskItem.appendChild(buttonGroup);
    list.appendChild(taskItem);

    completeButton.addEventListener('click', function () {
        taskItem.classList.toggle('completed');
    });
    deleteButton.addEventListener('click', function () {
        list.removeChild(taskItem);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateTaskNumbers();
    });
}

displayTasks();

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const taskName = input.value.trim();
    const taskDescription = description.value.trim();

    if (taskName === '') {
        alert('Please enter a task name.');
        return;
    }
    if (taskDescription === '') {
        alert('Please enter a task description.');
        return;
    }
    const task = {
        name: taskName,
        description: taskDescription
    };

    tasks.push(task);
    displayTask(task, tasks.length - 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    input.value = '';
    description.value = '';
});

