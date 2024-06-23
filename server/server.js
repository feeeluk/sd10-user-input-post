
import express from "express"
import cors from "cors"
import pg from "pg"
import dotenv from "dotenv"

import { comments } from "./comments.js"

const app = express()
const PORT = 7272

app.use(express.json())
app.use(cors())
// run the config method of dontenv so it configure itself
dotenv.config()

const db = new pg.Pool({
    connectionString: process.env.CONNECTION_STRING
})

app.get('/', (request, response) => {
    response.json({message: `You're looking at my root route, how rude!`})
})

app.get('/comments', async (request, response) => {
    // returns a bunch of comments from the database
    const result = await db.query(`SELECT * FROM comments`)
    // the rows property of 'result' has my array of database entries
    const final = result.rows
    response.json(final)
})

app.post('/comments', (request, response) => {
    console.log(request.body)
    let username = request.body.username
    let location = request.body.location
    let content = request.body.content
    
    db.query(`INSERT INTO comments (username, location, content) VALUES ($1, $2, $3)`, [username, location, content])
    response.send("saved comment")
})

app.listen(PORT, () => {
    console.log(`(*・‿・)ノ⌒*:･ﾟ✧ server running on port: ${PORT}`)
})
