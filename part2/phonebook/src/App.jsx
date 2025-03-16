import {useState} from 'react'
import Contact from "./components/Contact.jsx";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ]);
    const [filteredPeople, setFilteredPeople] = useState(persons);
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
        setPersons([...persons, {name: newName, number: newNumber}]);
    }

    function handleFilter(e) {
        const filteredPeople = persons
            .filter(person => person.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
        setFilteredPeople(filteredPeople);
    }

    return (<div>
        <h2>Phonebook</h2>
        <div>
            filter shown with <input
            onChange={e => handleFilter(e)}/>
        < /div>
        <h3>Add a new</h3>
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                name: <input onChange={e => setNewName(e.target.value)} value={newName}/>
            </div>
            <div>
                number: <input onChange={e => setNewNumber(e.target.value)} value={newNumber}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <div>
            {filteredPeople.map((person) => (<Contact key={person.id} contact={person}/>))}
        </div>
    </div>)
}

export default App