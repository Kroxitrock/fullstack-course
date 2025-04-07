const mongoose = require('mongoose');

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(_result => {
        console.log('connected to MongoDB')
    }).catch(error => {
    console.log('error connecting to MongoDB:', error.message)
})

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)


module.exports = Phonebook