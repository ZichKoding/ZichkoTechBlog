// add logout function
async function logout(event) {
    const response = await fetch('/api/users/logout', {
        method: 'post', 
        headers: {'Content-Type': 'application/json' }
    });
    // if the response is good send to home page. If not then send alert with why
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);