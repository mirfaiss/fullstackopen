const express = require('express')
const app = express()

app.use(express.json())

const persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

// DASHBOARD

app.get('/', (request, response) => {
    return response.send("<h1>Hello World !</h1>")
})



// GET persons

app.get('/api/persons', (request, response) => {
    return response.json(persons)
})



// GET info number of people and get the current time request

app.get('/info', (request, response) => {
    const personCount = persons.length

    const content = `<p>Phonebook has info for ${personCount}</p> 
    <p> ${new Date()}</p>`

    return response.send(`${content}`)
})





const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    // console.log(`Date ${new Date()}`)
})