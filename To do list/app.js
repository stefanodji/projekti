//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listeners
todoButton.addEventListener("click", addToList);
todoList.addEventListener("click", deleteCheck); //na celu listu, i u zavisnosti sta stisnemo
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);


//Finctions
function addToList(event){
    event.preventDefault(); //sprecava refresovanje :) jer je type submit

    //Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li element
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Add list to local storage
    saveLocal(todoInput.value);

    //Check mark
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></li>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Delete
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></li>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);


    todoList.appendChild(todoDiv);

    //Cear input value
    todoInput.value = "";

}


function deleteCheck(event){
    //console.log(event.target); //da vidimo sta smo kliknuli
    const item = event.target;

    //Delete Todo
    if(item.classList[0] === "trash-btn"){
        item.parentNode.classList.add("fall");
        removeLocalTodos(item.parentNode);
        item.parentNode.addEventListener("transitionend", () => { //ceka da se zavrsi transformacija, moze i animacija takodje
            item.parentNode.remove();
        })
        //item.parentNode.remove();
    }

    //Chech Mark
    if(item.classList[0] == "complete-btn"){
        item.classList.toggle("completed2");
        item.parentNode.classList.toggle("completed1"); //na klik menja izmedju ove i one klase
    }
}

function filterTodo(event){
    const todos = todoList.children;
    
    for(let x=0;x<todoList.childElementCount;x++){
        //console.log(todos); //kolekcija HTML elemenata
        switch(event.target.value){ //sta je izabrano u dropDown meniu
            case "all": 
            todos[x].style.display = "flex";
            break;
            case "completed":
                if(todos[x].classList.contains("completed2") || todos[x].classList.contains("completed1")){
                    todos[x].style.display = "flex";
                }else{
                    todos[x].style.display = "none";
                }
            break;
            case "uncompleted":
                if(todos[x].classList.contains("completed2") === false && !todos[x].classList.contains("completed1")){
                    todos[x].style.display = "flex";
                }else{
                    todos[x].style.display = "none";
                }
            break;
        }
    } 
}

function saveLocal(todo){

    //Check   do todo already exist??
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create li element
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //Check mark
        const completedButton = document.createElement("button");
        completedButton.innerHTML = "<i class='fas fa-check'></li>";
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Delete
        const trashButton = document.createElement("button");
        trashButton.innerHTML = "<i class='fas fa-trash'></li>";
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);


        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    
    todos = JSON.parse(localStorage.getItem("todos"));
    
    const todoIndex = todo.children[0].innerText;
    console.log(todos.indexOf(todoIndex));
    todos.splice(todos.indexOf(todoIndex),1); //Prvi argument od koje pozicije brisemo element, a drugi koliko pozicija brisemo :)
    localStorage.setItem("todos", JSON.stringify(todos));
}