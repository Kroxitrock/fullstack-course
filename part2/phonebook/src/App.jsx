import {useEffect, useState} from 'react'
import Contact from "./components/Contact.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Filter from "./components/Filter.jsx";
import {addPerson, getAllPersons} from "./services/persons.js";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getAllPersons()
            .then(response => {
                setPersons(response.data);
                setFilteredPeople(response.data);
            })
    }, []);

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

        addPerson({name: newName, number: newNumber})
            .then(r => {
                setPersons([...persons, r.data]);
                setFilteredPeople([...persons, r.data].filter(person => person.name.toLocaleLowerCase().includes(newFilter)));
                setNewName('');
                setNewNumber('');
            })
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