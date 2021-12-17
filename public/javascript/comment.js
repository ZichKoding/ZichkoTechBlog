// add a function to listen for a comment to be submitted
async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    // retrive blog_id from splicing url
    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    // then send to sever to add to database
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text,
                blog_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);

        // then retrieve it back and format it under the blog_post
        if (response.ok) {
            console.log(response);
            document.location.reload();
            console.log(response);
        } else {
            alert(response.statusText);
        }
    }
};

// listen for comment submission
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
