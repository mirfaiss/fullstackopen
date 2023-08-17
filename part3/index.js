const express = require('express')
const app = express()

app.use(express.json())

let persons = [
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



// GET Person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find(x => x.id === id)

    if (person) {
        console.log(person)
        return response.json(person)
    } else {
        console.log(person)
        return response.status(404).send("Person not found")
    }
})



// GET info number of people and get the current time request

app.get('/info', (request, response) => {
    const personCount = persons.length

    const content = `<p>Phonebook has info for ${personCount}</p> 
    <p> ${new Date()}</p>`

    return response.send(`${content}`)
})



// DELETE person

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    persons = persons.filter(x => x.id !== id)
    console.log(persons)

    response.status(204).end()
})





const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    // console.log(`Date ${new Date()}`)
})