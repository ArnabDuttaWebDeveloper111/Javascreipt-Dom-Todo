const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getTodo)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteItem)
filterOption.addEventListener('click', filterTodo)
function addTodo(e) {
    e.preventDefault();
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newItem = document.createElement('li')
    newItem.classList.add('todo-item')

    newItem.innerText = todoInput.value;
    todoDiv.appendChild(newItem)
    saveLocalTodos(todoInput.value)



    // Complete Button
    const completeButton = document.createElement('button')
    completeButton.classList.add('complete-button')
    completeButton.innerHTML = "<i class='fas fa-check'></i>"
    todoDiv.appendChild(completeButton)


    // Trash Button
    const trashButton = document.createElement('button')
    trashButton.classList.add('trash-button')
    trashButton.innerHTML = "<i class='fas fa-trash'></i>"
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
    todoInput.value = "";

}

function deleteItem(e) {
    const item = e.target;

    if (item.classList[0] === "trash-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeTodo(todo)

        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
        // todo.remove();
    }
    if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}






function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}
// function saveLocalTodos(todo) {
//     let todos;
//     if (localStorage.getItem("todos") === null) {
//         todos = [];
//     } else {
//         todos = JSON.parse(localStorage.getItem("todos"));
//     }
//     todos.push(todo);
//     localStorage.setItem("todos", JSON.stringify(todos));
// }

function getTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function (todo) {

        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        const newItem = document.createElement('li')
        newItem.classList.add('todo-item')

        newItem.innerText = todo;
        todoDiv.appendChild(newItem)




        // Complete Button
        const completeButton = document.createElement('button')
        completeButton.classList.add('complete-button')
        completeButton.innerHTML = "<i class='fas fa-check'></i>"
        todoDiv.appendChild(completeButton)


        // Trash Button
        const trashButton = document.createElement('button')
        trashButton.classList.add('trash-button')
        trashButton.innerHTML = "<i class='fas fa-trash'></i>"
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)

    })
}

function removeTodo(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}