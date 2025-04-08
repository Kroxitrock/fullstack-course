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

app.get('/api/persons', (req, res, next) => {
    Phonebook.find({})
        .then(result => {
            const persons = result.map(phonebook => ({
                id: phonebook._id.toString(),
                name: phonebook.name,
                number: phonebook.number
            }));
            res.json(persons);
        })
        .catch(error => {
            next(error);
        })
});

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Phonebook.find({_id: id})
        .then(result => {
            const persons = result.map(phonebook => ({
                id: phonebook._id.toString(),
                name: phonebook.name,
                number: phonebook.number
            }));
            res.json(persons);
        }).catch(error => next(error))
});

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;

    Phonebook.deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).send({ error: 'Person not found' });
            }
            res.status(204).end();
        })
        .catch(error => next(error));
});

app.post('/api/persons', (req, res, next) => {
    const newPerson = req.body;
    const validation = validatePerson(newPerson, res);
    if (validation) {
        return validation;
    }

    Phonebook.create({
        name: newPerson.name,
        number: newPerson.number
    }).then(_result => {
        res.status(201).json(newPerson);
    }).catch(error => next(error));
})

app.put('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    const validation = validatePerson(newPerson, res);
    if (validation) {
        return validation;
    }

    Phonebook.findByIdAndUpdate(id, newPerson, { new: true })
        .then(updatedPerson => {
            if (!updatedPerson) {
                return res.status(404).send({ error: 'Person not found' });
            }
            res.json(updatedPerson);
        })
        .catch(error => next(error));
})

function validatePerson(newPerson, res) {
    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({error: 'Name or number is missing'});
    }

    if (newPerson.name.length < 3) {
        return res.status(400).json({error: 'Name must be at least 3 characters long'});
    }

    if (newPerson.number.length < 8) {
        return res.status(400).json({error: 'Number must be at least 8 characters'});
    }

    if (!/^\d{2}-\d+$/.test(newPerson.number)) {
        return res.status(400).json({error: 'Number must start with two digits, followed by a dash and then only numbers'});
    }
    return null;
}

app.get('/info', (req, res, next) => {
    const date = new Date();
    Phonebook.countDocuments({}).then(count => {
        res.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`);
    }).catch(error => next(error));
})


const errorHandler = (error, req, res, next) => {
    console.error(error.message);

    console.log("error", error.name);
    if (error.name === 'CastError') {
        return res.status(400).send({error: 'malformatted id'});
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({error: error.message});
    }

    next(error);
}
app.use(errorHandler);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
})

