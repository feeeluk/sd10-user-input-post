// get the div by its id.
const commentsDiv = document.getElementById('comments')
const form = document.getElementById('form')

// function names 
// varibles
// (when I'm the one creating it/not using it (from javascript/otherpeople))
// do not matter

// I'd like to have my client send a get request to my server
// and fetch all the comments my server has
// and display them. 

async function fetchComments() {
    const response = await fetch('http://localhost:7272/comments')
    // we then have to tell the client how to read the response it got 
    const final = await response.json()
    console.log(final)
}
fetchComments()

function displayComments(arrayOfComments) {
    arrayOfComments.forEach(function(comment) {

    })
}
