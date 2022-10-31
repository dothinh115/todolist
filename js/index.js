import {Todo} from "./todolist.js";

//khởi tạo class Todo
let todo = new Todo;
//Lấy dữ liệu từ Local storage
todo.getLocalStorage();

//hàm render
let renderLayout = () => {
    //dom đến 2 phần hiển thị
    let doneTaskDom = document.querySelector("#completed");
    let notDoneTaskDom = document.querySelector("#todo");

    //render những việc đã làm
    doneTaskDom.innerHTML = todo.renderTask(true);

    //render những công việc chưa làm
    notDoneTaskDom.innerHTML = todo.renderTask(false);
}

renderLayout(todo.arrTodo);

//xóa task
window.delTask = id => {
    todo.delTask(id);
    todo.addLocalStorage();
    renderLayout(todo.arrTodo);
}

//check task
window.doneTask = id => {
    todo.doneToggle(id);
    todo.addLocalStorage();
    renderLayout(todo.arrTodo);
}

let addItem = () => {
    let newTodo = document.querySelector("#newTask");
    if(newTodo.value.trim() !== "") {
        todo.addTodo(newTodo.value);
        todo.addLocalStorage();
        newTodo.value = "";
    }
    else {
        alert("Nhập công việc vào!!!");
    }
}

document.querySelector("#addItem").addEventListener("submit", e => {
    e.preventDefault();
    addItem();
    renderLayout(todo.arrTodo);
});

document.querySelector("#one").addEventListener("click", () => {
    todo.checkAllTasks(true);
    todo.addLocalStorage();
    renderLayout(todo.arrTodo);
});

document.querySelector("#two").addEventListener("click", () => {
    todo.sortByName(false);
    renderLayout(todo.arrTodo);
});

document.querySelector("#three").addEventListener("click", () => {
    todo.sortByName(true);
    renderLayout(todo.arrTodo);
});

document.querySelector("#all").addEventListener("click", () => {
    todo.checkAllTasks(false);
    renderLayout(todo.arrTodo);
});
