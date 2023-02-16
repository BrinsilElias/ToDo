let countCheck = 0;
let counter = 0;
const alert = document.querySelector('.alert');

function ajax() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            response.slice(0, 100).forEach((element) => {
                const todo = element['title'];
                const status = element['completed'];

                // Todo List
                const todoList = document.getElementById('todo-list');
                // Todo
                const todoDiv = document.createElement('div');
                const todoWrapper = document.createElement('div');
                // Check Box
                const checkBox = document.createElement('input');
                //  Tasks
                const task = document.createElement('h3');
                // Delete Button
                const deleteButton = document.createElement('button');

                // Task List
                todoDiv.classList.add('todo', 'flex');
                todoWrapper.classList.add('todo-wrapper', 'flex');
                
                // Check Box
                checkBox.setAttribute('type', 'checkbox');
                checkBox.classList.add('check-box');

                // Task
                task.innerText = todo;
                
                // Delete
                deleteButton.classList.add('btn', 'delete-btn');
                deleteButton.setAttribute('data-icon', 'delete-icon');
                deleteButton.innerText = 'delete';

                if(status === true) {
                    checkBox.setAttribute('checked', 'true');
                    todoDiv.classList.add('completed');
                }

                // Insert into Todo div
                todoWrapper.appendChild(checkBox);
                todoWrapper.appendChild(task);
                todoDiv.appendChild(todoWrapper);
                todoDiv.appendChild(deleteButton);

                todoList.appendChild(todoDiv);
            });
            const inputCheck = document.querySelectorAll('input');
            inputCheck.forEach((element) => {
                if(!element.getAttribute('checked')) {
                    counter += 1;
                }
                displayCount(counter);
                element.addEventListener('click', () => {
                    addCheck(element);
                    if(element.getAttribute('checked')){
                        element.parentElement.parentElement.classList.add('completed');
                        counter -= 1;
                        countCheck += 1
                        displayCount(counter);
                        if(countCheck % 5 === 0) {
                            // Has to work when 5 task completed --------------------
                            createAlert()
                            window.scrollTo({top: 0, behavior: 'smooth'})
                            const closeButton = document.getElementById('close-btn');
                            closeButton.addEventListener('click', () => {
                                closeButton.parentElement.style.animation = 'var(--animation-fade-out)'
                                setTimeout(() => {
                                    alert.innerHTML = ``
                                }, 400);
                            })
                            // -------------------------------------------------------
                        }
                    }
                    else {
                        element.parentElement.parentElement.classList.remove('completed');
                        counter += 1;
                        displayCount(counter)
                    }
                })
            })
            const deleteBtn = document.querySelectorAll('.delete-btn');
            deleteBtn.forEach((element) => {
                element.addEventListener('click', () => {
                    const todo = element.parentElement
                    todo.style.animation = 'var(--animation-slide-out-left), var(--animation-fade-out)'
                    setTimeout(() => {
                        todo.remove()
                    }, 500);
                })
            })
        }
    }
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();   
}

ajax()

function addCheck(ele) {
    if(ele.getAttribute('checked')) {
        ele.removeAttribute('checked');
    }
    else {
        ele.setAttribute('checked', true)
    }
}

function displayCount(count) {
    document.getElementById('counter').innerText = count
}

function createAlert() {
    alert.innerHTML = 
    `<div class="modal container">
        <button id='close-btn' class="btn close-btn" data-icon="close-icon"></button>
        <div class="modal-wrapper flex">
            <div class="modal__icon">
                <svg class="green-tick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            </div>
            <div class="modal__wrapper">
                <h2 class="modal__title">Congratulation</h2>
                <p class="modal__body">You have successfully completed 5 tasks</p>
            </div>
        </div>
    </div>`
}



