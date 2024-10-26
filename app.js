let list = document.querySelector('ul.list');
let btnAdd = document.getElementById('btnAdd');
let listTask = [
    {
        content: 'content 1',
        status: 'doing',
    },
    {
        content: 'content task2',
        status: 'complete'
    }
];
if (localStorage.getItem('listTask') != null) {
    listTask = JSON.parse(localStorage.getItem('listTask'));
}

function saveLocalStorage() {
    localStorage.setItem('listTask', JSON.stringify(listTask));
}

btnAdd.onclick = function(event){
    event.preventDefault();
    let content = document.getElementById('task').value;
    if(content != ''){
        listTask.unshift({
            content: content,
            status: 'doing'
        })
    }
    addTaskToHTML();
    document.getElementById('task').value = '';
    saveLocalStorage();
}

function addTaskToHTML() {
    list.innerHTML = '';
    listTask.forEach((task, index) => {
        let newTask = document.createElement('li');
        newTask.classList.add(task.status);
        newTask.innerHTML = `
        <div class="complete-icon" onClick="completeTask(${index})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path
                d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
        </svg>
    </div>
    <div class="content">${task.content}</div>
    <div class="close-icon" onClick="deleteTask(${index})">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
    </div>
        `;
        list.appendChild(newTask);
    })
}
addTaskToHTML();

function completeTask(index){
    listTask[index].status = 'complete';
    addTaskToHTML();
    saveLocalStorage();
}
function deleteTask(index){
    listTask = listTask.filter((task, newIndex) => {
        return newIndex != index
    });
    addTaskToHTML();
    saveLocalStorage();
}