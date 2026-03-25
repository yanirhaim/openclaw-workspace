// Pomodoro Timer and Task Management Script

let timerDuration = 25 * 60; // 25 minutes in seconds
let timerInterval = null;
let isRunning = false;
let tasks = [];

// DOM Elements
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Event Listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
addTaskBtn.addEventListener('click', addTask);

// Timer Functions
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

function updateTimer() {
    timerDuration--;
    const minutes = Math.floor(timerDuration / 60);
    const seconds = timerDuration % 60;
    timerDisplay.textContent = `${padZero(minutes)}:${padZero(seconds)}`;
    if (timerDuration <= 0) {
        stopTimer();
        timerDuration = 25 * 60; // Reset
    }
}

function padZero(num) {
    return num < 10? '0' + num : num;
}

// Task Management Functions
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task: taskText })
        })
       .then(response => response.ok? response.json() : null)
       .then(data => {
            if (data) {
                displayTasks();
                taskInput.value = '';
            }
        });
    }
}

function displayTasks() {
    fetch('/tasks')
       .then(response => response.json())
       .then(data => {
            tasks = data;
            renderTaskList();
        });
}

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}

// Initial load
displayTasks();