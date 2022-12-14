const dom = {
    categories: document.getElementById('categories'),
    categoryAddBtn: document.getElementById('category-add-btn'),
    categoryDelBtn: document.getElementById('category-del-btn'),
    new: document.getElementById('new'),
    addTask: document.getElementById('add-task'),
    tasks: document.getElementById('tasks'),
    taskDelBtn: document.getElementById('task-del-btn')
}
//массив для задач
const allTasks = [];
//проверка на пустое значение + вызов функции на одинаковое значение
dom.addTask.onclick = () => {
    const newTask = dom.new.value
    if (newTask && checkRepeat(newTask, allTasks)) {
        addTask(newTask, allTasks)
        dom.new.value = ''
        tasksRender(allTasks)
    } 
}
//добавление задачи в массив
function addTask(text, list) {
    const timestamp = Date.now()
    const task = {
        id: timestamp,
        text,
        isComplete: false
    }
    list.push(task)
}
//проверка одинаковых значений
function checkRepeat(text, list) {
    let isNotHave = true
    
    list.forEach((task) => {
        if(task.text == text) {
            alert('Задача уже существует!')
            isNotHave = false
        }
    })
    
    return isNotHave
}
//Вывод списка задач
function tasksRender(list) {
    let htmlList = ''

    list.forEach((task) => {
        const cls = task.isComplete ? 'main_task main_task_complete' : 'main_task'
        const checked = task.isComplete ? 'checked' : ''

        const taskHtml = 
        `<div id="${task.id}" class="${cls}">
        <label class="main_checkbox">
            <input type="checkbox" ${checked}>
            <div class="main_checkbox_div"></div>
        </label>
        <p class="main_task_text">${task.text} </p>
        <div id="task-del-btn" class="main_task_del">-</div>
        </div>`

        htmlList = htmlList + taskHtml
    })

    dom.tasks.innerHTML = htmlList
}
//Отслеживание клика по checkbox
dom.tasks.onclick = (event) => {
    const target = event.target

    if (target.classList.contains('main_checkbox_div')) {
         const task = target.parentElement.parentElement
         const taskId = task.getAttribute('id')
         changeTaskStatus(taskId, allTasks)
         tasksRender(allTasks)
    }
    if (target.classList.contains('main_task_del')) {
         const task = target.parentElement
         const taskId = task.getAttribute('id')
         deleteTask(taskId, allTasks)
         tasksRender(allTasks)
    }
}
//Функция изменения статуса задач
    function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete
        }
    })
} 

//Функция удаления задачи
    function deleteTask(id, list) {
    list.forEach((task, idx) => {
       if (task.id == id) {
           list.splice([idx], 1)
       }
    })
}


const allCategories = [];

dom.categoryAddBtn.onclick = () => {
    const newCategory = dom.new.value

    if (newCategory && categoryCheckRepeat(newCategory, allCategories) && categoryLength(newCategory)) {
        addCategory(newCategory, allCategories)
        dom.new.value = ''
        categoriesRender(allCategories)
    }
}

function addCategory(text, list) {
    const timestamp = Date.now()
    const category = {
        id: timestamp,
        text,
        checked: false
    }
    list.push(category)
}

function categoryLength(text) {
    let length = true

    if (text.length > 9) {
        alert('Не более 9 символов')
        length = false
    }
    return length
}

function categoryCheckRepeat(text, list) {
    let isNotHave = true
    
    list.forEach((category) => { 
        if(category.text == text) {
            alert('Задача уже существует!')
            isNotHave = false
        }
    })
    
    return isNotHave
}

function categoriesRender(list) {
    let htmlList = ''

    list.forEach((category) => {
        const checked = category.isComplete ? 'checked' : ''

        const categoryHtml = 
        `<div id="${category.id}" class="category_items">
        <label class="category_checkbox">
            <input class="category_checkbox_input" type="checkbox" ${checked}>
            <div class="category_checkbox_div"></div>
        </label>
        <a href="#">${category.text}</a>
    </div>`

        htmlList = htmlList + categoryHtml
    })

    dom.categories.innerHTML = htmlList
}

dom.categories.onclick = (event) => {
    const target = event.target

    if (target.classList.contains('category_checkbox_div')) {
         const category = target.parentElement.parentElement
         const categoryId = category.getAttribute('id')
         changeCategoryStatus(categoryId, allCategories)
         categoriesRender(allCategories)
    }
}

function changeCategoryStatus(id, list) {
    list.forEach((category) => {
        if (category.id == id) {
            category.isComplete = !category.isComplete
        }
    })
}
dom.categoryDelBtn.onclick = () => {
         deleteCategory(allCategories)
         categoriesRender(allCategories) 
}

function deleteCategory(list) {
    list.forEach((category, idx) => {
       if (category.isComplete) {
           list.splice([idx], 1)
       }
    })
}


