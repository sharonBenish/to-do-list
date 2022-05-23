const taskInput = document.getElementById("task-input");
const toDoList = document.getElementById("to-do-list");
const clear = document.querySelector(".clear-all");
let tasks=[];

taskInput.addEventListener("submit", (e)=>{
    e.preventDefault();
    const task = taskInput.querySelector("input").value;
    let taskId = String(Date.now());
    if (task.trim() === "") return;
    const taskItem = document.createElement("li");
    taskItem.setAttribute("id", `${taskId}`);
    
    addToDOM(task,taskItem);
    addToArray(taskId, task);

    taskInput.querySelector("input").value ="";

    deleteBtn = taskItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", ()=>{
        deleteFromDOM(taskItem);
        deleteFromArray(taskId);
    })

    editBtn = taskItem.querySelector(".edit-btn");
    editBtn.addEventListener("click", ()=>{
        editEntry(taskItem,taskId)

    })
    
})


clear.addEventListener("click", ()=>{
    while (toDoList.firstChild){
        toDoList.removeChild(toDoList.firstChild);   
    }
    tasks=[];
})



function addToDOM (task, taskItem){
    taskItem.innerHTML = `
                        <div class="task"><input type="checkbox" class="checkbox">
                            <textarea
                                wrap="soft"
                                class="text"
                                readonly>
                            </textarea>
                            
                        </div>
                        
                        <span class="list-actions">
                            <button class="edit-btn list-btn"></button>
                            <button class="delete-btn list-btn"></button>   
                        </span>
    
                    `
    let textarea = taskItem.querySelector("textarea");
    textarea.value = task;
    toDoList.appendChild(taskItem);
}

function addToArray(taskId, task){
    tasks.push({Id:taskId, task:task});
    console.log(tasks);
}

function deleteFromDOM(taskItem){
    toDoList.removeChild(taskItem);
}

function deleteFromArray(uniqId){
tasks = tasks.filter(taski=>taski.Id !== uniqId);
    console.log(tasks);
}

function editEntry(taskItem, uniqId){
    console.log(uniqId);
    let listInput  = taskItem.querySelector(".text");
        const checkbox = taskItem.querySelector(".checkbox");
        if(checkbox.checked)return;
        if (!listInput.classList.contains("edit")){
            listInput.classList.add("edit");
            listInput.removeAttribute("readonly");
        }else{
            listInput.classList.remove("edit");
            listInput.setAttribute("readonly", "readonly");
            const indx = tasks.findIndex(el => el.Id == uniqId);
            tasks[indx]['task'] = listInput.value;
            console.log(tasks);
        }
}
    
    




