const express = require('express')
const morgan = require('morgan')

const body = (req, res, next) => {
    console.log(req.body)
    next()
}

const app = express()


// Middleware untuk mengurai body permintaan berformat JSON
app.use(express.json())

morgan.token('body', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

// Menggunakan Middleware 'morgan'
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// app.use(morgan('tiny'))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


// Middleware untuk mencatat informasi permintaan
// const requestLogger = (req, res, next) => {
//     console.log('Permintaan diterima:', req.method, req.url);
//     console.log('Body permintaan:', req.body);
//     next(); // Lanjut ke middleware atau penanganan rute berikutnya
// }

// app.use(requestLogger);



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
        // console.log(person)
        return response.json(person)
    } else {
        // console.log(person)
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



// POST, add person

const isSame = (name) => {
    const x = persons.find(x => x.name.toLowerCase() === name)
    console.log('is name found :', x)



    return x ? true : false
    // work
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.send('The name or number is missing...')
    }

    if (isSame(body.name.toLowerCase())) {
        // console.log('is same :', isSame(body.name.toLowerCase()))
        return response.status(404).json({ error: 'name must be unique' })
    }


    const id = Math.floor(Math.random() * 100000) + 1

    body.id = id

    const arranged = {
        "id": body.id,
        "name": body.name,
        "number": body.number
    }


    persons = persons.concat(arranged)

    return response.json(persons)

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