const eraseAllBtn = document.querySelector(".js-erase-all-btn");

const taskField = document.querySelector(".js-task-input");
const addBtn = document.querySelector(".js-add-btn");

const completedBtn = document.querySelector(".js-completed-btn");
const incompletedBtn = document.querySelector(".js-incompleted-btn");
const showAllBtn = document.querySelector(".js-show-all-btn");
const deleteAllBtn = document.querySelector(".js-del-btn");

const tasksContainer = document.querySelector(".js-tasks");
const tasksToComplete = document.querySelector(".js-tasks-to-complete");

let data = JSON.parse(localStorage.getItem("to-do")) || {};
let date = '';

function updateData() {
    localStorage.setItem("to-do",JSON.stringify(data))
} 

function deleteTask() {
    const listDeleteBtns = document.querySelectorAll(".js-del-btn");
    if (listDeleteBtns !== null) {
        listDeleteBtns.forEach(listDeleteBtn => {
            listDeleteBtn.addEventListener("click", e => {
                const listToDelete = listDeleteBtn.parentElement.previousElementSibling.textContent;
                
                let index = data[date].completed.findIndex(task => {
                    return task === listToDelete;
                })
                if (index >= 0) data[date].completed.splice(index,1);

                index = data[date].incompleted.findIndex(task => {
                    return task === listToDelete;
                })
                if (index >= 0) data[date].incompleted.splice(index,1);
                insertHTMLTasks(date);
            })
        })
    }
}

function completedTask() {
    const radios = document.querySelectorAll("input[type='radio'");
    radios.forEach( radio => {
        radio.addEventListener("click", e => {
            let finishedTask = radio.nextElementSibling.textContent;
            data[date].completed.push(finishedTask)

            radio.nextElementSibling.classList.add("completed")

            const index = data[date].incompleted.findIndex( task => {
                return task === finishedTask;
            })

            if (Number(radio.value) === Number(index)) {
                data[date].incompleted.splice(index,1);
            }
            insertHTMLTasks(date);
            // console.log(data);
        })
    })    
}

function insertHTMLTasks(date) {
    tasksContainer.replaceChildren() 
    for (let i = 0; i < data[date].completed.length; i++) {
        const html = `<li>
                        <input type="radio" value="${i}">
                        <p class="completed">${data[date].completed[i]}</p>
                        <div class="options js-options">
                            <i class="fa-solid fa-trash delete-op js-del-btn" ></i>
                        </div>
                    </li>
                    `
        tasksContainer.insertAdjacentHTML("afterbegin",html);
    }

    for (let i = 0; i < data[date].incompleted.length; i++) {
        const html = `<li>
                        <input type="radio" value="${i}">
                        <p>${data[date].incompleted[i]}</p>
                        <div class="options js-options">
                            <i class="fa-solid fa-trash delete-op js-del-btn" ></i>
                        </div>
                    </li>
                    `
        tasksContainer.insertAdjacentHTML("afterbegin",html);
    }

    let incompletedTasks = data[date].incompleted.length
    tasksToComplete.textContent = incompletedTasks > 1 ? incompletedTasks + " tasks" : incompletedTasks + " task";

    completedTask()
    deleteTask()
    localStorage.setItem("to-do",JSON.stringify(data))
}

eraseAllBtn.addEventListener("click", e => {
    const trash = JSON.parse(localStorage.getItem('to-do'))
    Object.keys(trash).forEach( key => {
        delete data[key]
    })
    localStorage.removeItem('to-do')
    localStorage.clear()
    data[date] = {
        completed : [],
        incompleted : []
    }
    localStorage.setItem("to-do",JSON.stringify(data))
    insertHTMLTasks(date)
})

completedBtn.addEventListener("click", e => {
    tasksContainer.replaceChildren()    
    for (let i = 0; i < data[date].completed.length; i++) {
        const html = `<li>
                        <input type="radio" value="${i}">
                        <p class="completed">${data[date].completed[i]}</p>
                        <div class="options js-options">
                            <i class="fa-solid fa-trash delete-op js-del-btn" ></i>
                        </div>
                    </li>
                    `
        tasksContainer.insertAdjacentHTML("afterbegin",html);
    }
})

incompletedBtn.addEventListener("click", e => {
    tasksContainer.replaceChildren()  
    for (let i = 0; i < data[date].incompleted.length; i++) {
        const html = `<li>
                        <input type="radio" value="${i}">
                        <p>${data[date].incompleted[i]}</p>
                        <div class="options js-options">
                            <i class="fa-solid fa-trash delete-op js-del-btn" ></i>
                        </div>
                    </li>
                    `
        tasksContainer.insertAdjacentHTML("afterbegin",html);
    }  
})

showAllBtn.addEventListener("click", e => {
    insertHTMLTasks(date)
})

deleteAllBtn.addEventListener("click", e => {
    data[date].completed.splice(0);
    data[date].incompleted.splice(0);
    insertHTMLTasks(date);
})

addBtn.addEventListener("click", e => {
    if (!taskField.value) {
        taskField.classList.add("error");
        taskField.placeholder = "Empty field not allowed"
        setTimeout(()=>{
            taskField.classList.remove("error");
            taskField.placeholder = "Enter the task..."
        },3000)
    } else {
        data[date].incompleted.push(taskField.value);
        taskField.value = "";
        
        insertHTMLTasks(date)
    }  
})

export function updatedDate(day,month,year) {
    date = `${day}-${month}-${year}`;
    if (!data.hasOwnProperty(date)) {
        data[date] = {
            completed : [],
            incompleted : []
        }
    }
    insertHTMLTasks(date)
}




