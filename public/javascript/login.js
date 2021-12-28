// Create signupFormHandler to post the new user to the server's database
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // if the username, email, and password forms have values in them POST them to server
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response);

        // check the response status
        if (response.ok) {
            console.log('sucess');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

// listen for signup's submit button
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// Create a loginFormHandler to check if the user that is trying to login matches a user in the database
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();


    // if email and password inputs have value move onto making a fetch to validate the user
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

// add event listener to the login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);