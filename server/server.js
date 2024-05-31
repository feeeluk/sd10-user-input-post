import express from "express"
import cors from "cors"
import { comments } from "./comments.js"

const app = express()
const PORT = 7272

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    response.json({message: `You're looking at my root route, how rude!`})
})

app.get('/comments', (request, response) => {
    response.json(comments)
})

app.post('/comments', (request, response) => {
    console.log(request.body)
    response.send('placeholder')
})

app.listen(PORT, () => {
    console.log(`(*・‿・)ノ⌒*:･ﾟ✧ server running on port: ${PORT}`)
})