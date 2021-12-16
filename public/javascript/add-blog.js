// create blog and post it to database
async function createBlogHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#blog-title').value.trim();
    const blog_post = document.querySelector("#blog-text").value.trim();


    // send data to backend 
    const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({
            title,
            blog_post
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    // if the response is ok then reload the dashboard page
    if (response.ok) {
        document.location.replace('/dashboard');
        console.log('success!!!!!!');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-blog-form').addEventListener('submit', createBlogHandler);