const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kroxitrock:${password}@cluster0.xosbq1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
    Phonebook.find({})
        .then(result => {
            console.log('phonebook:')
            result.forEach(phonebook => {
                console.log(phonebook.name, phonebook.number)
            })
            mongoose.connection.close()
        })
    return
}


const name = process.argv[3]
const number = process.argv[4]

const phonebook = new Phonebook({
    name,
    number
})

phonebook.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
})