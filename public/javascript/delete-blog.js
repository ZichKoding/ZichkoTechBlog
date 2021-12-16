// delete blog function 
async function deleteFormHandler(event) {
    event.preventDefault();

    // retrieve blog id
    const blogId = document.querySelector('.delete-blog').id
    console.log(blogId);

    // DELETE fetch to backend with blogId
    const response = await fetch(`api/blogs/${blogId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

};

document.querySelector('#a-blog').addEventListener('click', deleteFormHandler);