let input  = document.querySelector(".input");
let submit = document.querySelector(".btn");
let taskdiv =  document.querySelector(".tasks");
let array = [];
if(localStorage.getItem("tasks")){
    array = JSON.parse(localStorage.getItem("tasks"));
}
getData();
//add tasks
taskdiv.addEventListener("click",(e) =>{
    if(e.target.classList.contains("del")){
        e.target.parentElement.remove();
        deleteTaskfromLocalStorg(e.target.parentElement.getAttribute("data-id"));
    }
    toggleStatus(e.target.getAttribute("data-id"));
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("done");
    }
}
)
submit.onclick = function(){
    if(input.value !== ""){
        addTaskToArray(input.value);
        input.value = "";
    }
}

function addTaskToArray(tasktext){
    const  task = {
        id: Date.now(),
        title: tasktext,
        completed: false,
    };
    array.push(task);
    addElemntsToPage(array);
    addDataTstorg(array);
}

function addElemntsToPage(array){
    taskdiv.innerHTML  = "";
    array.forEach((task)=>{
        let div  =  document.createElement("div");
        div.className="task";
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        let span  = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delte"));
        div.appendChild(span);
        console.log(div);
        taskdiv.appendChild(div);
    });
}
function  addDataTstorg(array){
    window.localStorage.setItem("tasks",JSON.stringify(array));
}
function getData(){
    let data =  window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElemntsToPage(tasks);
    }
}
function deleteTaskfromLocalStorg(elemnet){
    array = array.filter((task) => task.id != elemnet);
    addDataTstorg(array);
}
function toggleStatus(elemnet){
    for(i=0;i < array.length ; i++){
        if(array[i].id == elemnet){
            array[i].completed == false ? (array[i].completed = true) : (array[i].completed = false);
        }
    }
    addDataTstorg(array);
}