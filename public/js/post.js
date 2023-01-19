const savePost = async (e) => {

    e.preventDefault();

    const newpost_title = document.querySelector('#newpost-title').value.trim();
    const newpost_body = document.querySelector('#newpost-body').value.trim();


    const reqId = e.target.getAttribute('data-id');
    const reqSaveAction = e.target.getAttribute('data-func');

    console.log(e.target);
    console.log("the id is " + reqId);

      switch (reqSaveAction) {

        case 'save':

            const newPost = {
              'title': newpost_title,
              'description': newpost_body
            }

            const saveResponse = await fetch('/api/postRoutes', {
              method: 'POST',
              body: JSON.stringify(newPost),
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if(saveResponse.ok) {
              document.location.replace('/');
            } else {
              alert('Failed to save post');
            }

          break;

        case 'update':

            const updatedPost = {
              'title': newpost_title,
              'description': newpost_body
            }

            const updateResponse = await fetch(`/api/postRoutes/${reqId}`, {
              method: 'PUT',
              body: JSON.stringify(updatedPost),
              headers: {
                'Content-Type': 'application/json'
              }
            });
        
            if(updateResponse.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed to update post');
            }

          break;

        default:
          break;

      }
}


const updateDelPost = async (e) => {

  const reqAction = e.target.getAttribute('data-func');

  switch (reqAction) {

    case 'update':
      if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');
        const idNum = parseInt(id, 10);
    
        if (e.target.hasAttribute('data-id')) {
          const id = e.target.getAttribute('data-id');
          const idNum = parseInt(id, 10);
          location.href=`/post/${idNum}`;
        }
      }
      break;
    
    case 'delete':
      if (e.target.hasAttribute('data-id')) {
        const id = e.target.getAttribute('data-id');
        const idNum = parseInt(id, 10);
    
        const response = await fetch(`/api/postRoutes/${idNum}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          document.location.reload();
        } else {
          alert('Failed to delete project');
        }
      }
      break;
  
    default:
      break;
  }
}


var blogrollButtons = document.querySelector('.blogroll-posts');
if(blogrollButtons) {
  blogrollButtons.addEventListener('click', updateDelPost);
} 

var newPostBtn = document.querySelector('#create-post');
if(newPostBtn) {
  newPostBtn.addEventListener('click', (e) => { location.href='/post' });
} 

var createPostForm = document.querySelector('.create-a-post-form');
if(createPostForm) {
  createPostForm.addEventListener('submit', savePost);
}

var updatePostForm = document.querySelector('.update-a-post-form');
if(updatePostForm) {
  updatePostForm.addEventListener('submit', savePost);
}