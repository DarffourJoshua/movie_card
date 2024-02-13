const todoList = document.querySelector('#todoList');
const addBtn = document.querySelector('#inputBTN');
const displayTask = document.querySelector('#myTodos');

class todos {
    constructor(id, task, completed) {
        this.id = id;
        this.task = task;
        this.completed = completed;
    }
}

const randNum = () =>  Math.floor(Math.random() * 100);
// create element with attributes
function createElement(tag, options) {
    const element = document.createElement(tag);
    return Object.assign(element, options)
}

// add todos element
function addTodosElement(newObj) {
    const todoItem = createElement('div', {
        classList: 'tasklist',
        id: newObj.id,
    });

    const todoName = createElement('span', {
        innerText: newObj.task,
        classList: newObj.completed ? 'completed' : '' 
    })

    const editBtn = createElement('img', {
        src: 'edit.png',
        classList: 'edit',
        onclick: () => editTodo(newObj.id),
    });

    const removeBtn = createElement('img', {
        src: 'delete.png',
        classList: 'delete',
        onclick: () => removeTodo(newObj.id),
    });

    todoItem.append(todoName ,editBtn, removeBtn);
    displayTask.appendChild(todoItem)
}

// edit todo
const editTodo = (newObj) => {
    const taskElement = document.getElementById(newObj);
    const taskNameElement = taskElement.querySelector('span');
    const task = JSON.parse(localStorage.getItem(newObj));
    todoList.value = task.task;
    todoList.addEventListener('blur', () => {
        const newTaskName = todoList.value;
        task.task = newTaskName;
        localStorage.setItem(newObj, JSON.stringify(task));
        taskNameElement.innerText = newTaskName;
    });
}

// remove todo
const removeTodo = (newObj) => {
    const taskId = document.getElementById(newObj)
    if(taskId) {taskId.remove()}
    localStorage.removeItem(newObj)
}

//get elements from localstorage
const loadFromLocalStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const todoItem = JSON.parse(localStorage.getItem(key));
        addTodosElement(todoItem);
    }
}
loadFromLocalStorage();

addBtn.addEventListener('click', () => {
    if (todoList.value === '') {
        alert('Enter a value');
    }   else {
        let newTask = new todos(randNum(), todoList.value, false);
        localStorage.setItem(newTask.id, JSON.stringify(newTask))
        addTodosElement(newTask);
    }
    todoList.value = '';
})

/**
 * 
 * inputField.addEventListener('blur', () => {
        const newTaskName = inputField.value;
        task.task = newTaskName;
        localStorage.setItem(taskId, JSON.stringify(task));
        taskNameElement.innerText = newTaskName;
        taskNameElement.style.display = 'inline'; // Show task name element
        inputField.remove(); // Remove input field
 */