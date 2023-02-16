// Query Selectors
const username = document.getElementById('username');
const password = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

// Event Listeners
loginButton.addEventListener('click', checkPassword);
username.addEventListener('click', () => {
    username.classList.remove('invalid-outline');
})
password.addEventListener('click', () => {
    password.classList.remove('invalid-outline');
})

// Function
function checkPassword(e) {
    if(username.value === 'admin' && password.value === '12345') {
        const form = document.getElementById('login-form');
        form.setAttribute('action', './todo.html');
        ajax();
    }
    else {
        e.preventDefault();
        username.classList.add('invalid-outline');
        password.classList.add('invalid-outline');
        if(username.value === 'admin') {
            username.classList.remove('invalid-outline');
        }
        else if(password.value === '12345') {
            password.classList.remove('invalid-outline');
        }
    }
}



