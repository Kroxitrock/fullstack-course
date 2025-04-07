const express = require('express');
const morgan = require("morgan");
const cors = require('cors');
const Phonebook = require('./models/phonebook');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        req.method === 'POST' ? JSON.stringify(req.body) : '',
    ].join(' ')
}));
app.use(cors())
app.use(express.static('_dist'));

const persons = [];

Phonebook.find({})
    .then(result => {
        result.forEach(phonebook => {
            persons.push({
                id: phonebook._id.toString(),
                name: phonebook.name,
                number: phonebook.number
            });
        });
    })

app.get('/api/persons', (req, res) => res.json(persons));

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).send({ error: 'Person not found' });
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const index = persons.findIndex(p => p.id === id);
    if (index !== -1) {
        persons.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).send({error: 'Person not found'});
    }
});

app.post('/api/persons', (req, res) => {
    const newPerson = req.body;

    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({error: 'Name or number is missing'});
    }

    if (persons.find(p => p.name === newPerson.name)) {
        return res.status(400).json({error: 'Name must be unique'});
    }

    Phonebook.create({
        name: newPerson.name,
        number: newPerson.number
    }).then(result => {
        newPerson.id = result._id.toString();
        persons.push({...newPerson, id : result._id.toString()});
        res.status(201).json(newPerson);
    });
})

app.get('/info', (req, res) => {
    const date = new Date();
    const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
    res.send(info);
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})