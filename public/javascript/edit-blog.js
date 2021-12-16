// edit blog function
async function editBlogHandler(event) {
    event.preventDefault();

    // retrieve blog id from url
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    // retrieve blog title
    const blogTitle = document.querySelector('input[name="blog-title"]').value.trim();
    // retrieve blog contents
    const blogPost = document.querySelector('#blog-text').value.trim();

    // if the blog title and blog post has some value in it the PUT api request will activate on save
    if (blogTitle && blogPost) {
        const response = await fetch(`/api/blogs/${blog_id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: blogTitle,
                blog_post: blogPost 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

};

document.querySelector('.edit-blog-form').addEventListener('submit', editBlogHandler);