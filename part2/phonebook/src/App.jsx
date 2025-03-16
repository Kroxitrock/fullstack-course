import {useState} from 'react'
import Contact from "./components/Contact.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Filter from "./components/Filter.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [filteredPeople, setFilteredPeople] = useState(persons);
    const [newFilter, setNewFilter] = useState('');
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        if (persons.find(person => person.number === newNumber)) {
            alert(`${newNumber} is already added to phonebook`);
            return;
        }
        const newPeople = [...persons, {name: newName, number: newNumber, id: persons.length + 1}];
        setPersons(newPeople);
        setFilteredPeople(newPeople.filter(person => person.name.toLocaleLowerCase().includes(newFilter)));
    }

    function handleFilter(e) {
        setNewFilter(e.target.value.toLocaleLowerCase());
        if (e.target.value === '') {
            setFilteredPeople(persons);
            return
        }
        const filteredPeople = persons
            .filter(person => person.name.toLocaleLowerCase().includes(newFilter));
        setFilteredPeople(filteredPeople);
    }

    return (<div>
        <h2>Phonebook</h2>
        <Filter handleFilter={handleFilter}></Filter>
        <h3>Add a new</h3>
        <ContactForm props={{handleSubmit, newName, setNewName, newNumber, setNewNumber}}></ContactForm>
        <h2>Numbers</h2>
        <div>
            {filteredPeople.map((person) => (<Contact key={person.id} contact={person}/>))}
        </div>
    </div>)
}

export default App