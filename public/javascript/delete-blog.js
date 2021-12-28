// delete blog function 
async function deleteFormHandler(event) {
    event.preventDefault();

    // retrieve blog id
    const blogId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    console.log(blogId);

    // DELETE fetch to backend with blogId
    const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.delete-blog').addEventListener('click', deleteFormHandler);