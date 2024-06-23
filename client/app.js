let htmlForm = document.getElementById("commentForm")
let htmlCommentsSection = document.getElementById("commentsSection")

async function fetchComments(){
    let response = await fetch("http://localhost:7272/comments")
    let final = await response.json()
    console.log(final)

    displayComments(final)
}

fetchComments()

function displayComments(arrayOfComments){
    arrayOfComments.forEach( function (comment){
        let userNameP = document.createElement("p")
        userNameP.setAttribute("class","username")

        let locationP = document.createElement("p")
        locationP.setAttribute("class","location")

        let commentP = document.createElement("p")
        commentP.setAttribute("class","content")

        let postD = document.createElement("div")
        postD.setAttribute("class","comment")

        userNameP.innerText = "Username: " + comment.username
        locationP.innerText = "Location: " + comment.location
        commentP.innerText = "Content: " + comment.content

        postD.appendChild(userNameP)
        postD.appendChild(locationP)
        postD.appendChild(commentP)
        htmlCommentsSection.appendChild(postD)
    });
}

htmlForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let data = new FormData(htmlForm)
    let newComment = Object.fromEntries(data)

    console.log(newComment)

    fetch("http://localhost:7272/comments", {
        method: "POST", headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(newComment)
    })

    setTimeout(refresh, 300)
})

function refresh(){
    window.location.reload()
}