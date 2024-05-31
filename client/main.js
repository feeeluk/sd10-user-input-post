// get the div by its id.
const commentsDiv = document.getElementById('comments')
const form = document.getElementById('commentForm')

// function names 
// varible names
// (when I'm the one creating it/not using it from javascript/otherpeople)
// do not matter

// I'd like to have my client send a get request to my server
// and fetch all the comments my server has
// and display them. 

async function fetchComments() {
    const response = await fetch('http://localhost:7272/comments')
    // we then have to tell the client how to read the response it got 
    const final = await response.json()
    displayComments(final)
}
fetchComments()

function displayComments(arrayOfComments) {
    arrayOfComments.forEach(function(comment) {
        let commentDiv = document.createElement('div')
        let userNamePTag = document.createElement('p')
        let locationPTag = document.createElement('p')
        let commentPTag = document.createElement('p')

        // a useful method - adding a class attribute with 'location' as the value
        locationPTag.setAttribute('class', 'location')

        userNamePTag.innerText = comment.username
        locationPTag.innerText = comment.location
        commentPTag.innerText = comment.content
        // can use alt + shift and arrow keys to copy a line
        commentDiv.appendChild(userNamePTag)
        commentDiv.appendChild(locationPTag)
        commentDiv.appendChild(commentPTag)

        commentsDiv.appendChild(commentDiv)
    })
}


form.addEventListener('submit', (event) => {
    event.preventDefault()
    // get our data from the form.
    // 1) create our formData object
    const data = new FormData(form)
    // 2) Turn that into a 'normal' object
    const newComment = Object.fromEntries(data)

    console.log(newComment)

    // the fetch function can optionally take a second function as an arugment
    // we call this the options object.
    fetch('http://localhost:7272/comments', {
        // http method we're talking to the server with
        method: "POST",
        // letting the server know the format of the body im sending
        headers: {
            "Content-Type": "application/json"
        },
        // we always send data in the 'body' of our request
        body: JSON.stringify(newComment)
    })
})