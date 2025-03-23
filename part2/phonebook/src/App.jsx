import {useEffect, useState} from 'react'
import Contact from "./components/Contact.jsx";
import ContactForm from "./components/ContactForm.jsx";
import Filter from "./components/Filter.jsx";
import {addPerson, deletePerson, getAllPersons, updatePerson} from "./services/persons.js";
import Notification from "./components/Notification.jsx";

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
    const [notification, setNotification] = useState('')
    const [notificationType, setNotificationType] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        if (persons.find(person => person.name === newName)) {

            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const person = persons.find(person => person.name === newName);
                const updatedPerson = {...person, number: newNumber};
                return updatePerson(person.id, updatedPerson)
                    .then(r => {
                        setPersons(persons.map(person => person.id !== r.data.id ? person : r.data));
                        setFilteredPeople(filteredPeople.map(person => person.id !== r.data.id ? person : r.data));
                        setNewName('');
                        setNewNumber('');
                        setNotification(r.data.name);
                        setNotificationType('success');
                    })
                    .catch(() => {
                        setNotification(`Information of ${newName} has already been removed from server`);
                        setNotificationType('error');
                        setPersons(persons.filter(person => person.name !== newName));
                        setFilteredPeople(filteredPeople.filter(person => person.name !== newName));
                    });
            }

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
                setNotification(r.data.name);
                setNotificationType('success');
            }).catch(() => {
                setNotification('Error adding person');
                setNotificationType('error');
        });
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

    function deleteCallback(id) {
        return () => {
            if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
                deletePerson(id)
                    .then(() => {
                        setPersons(persons.filter(person => person.id !== id));
                        setFilteredPeople(filteredPeople.filter(person => person.id !== id));
                    })
                    .catch(() => {
                        setNotification(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`);
                        setNotificationType('error');
                        setPersons(persons.filter(person => person.id !== id));
                        setFilteredPeople(filteredPeople.filter(person => person.id !== id));
                    });
            }
        }
    }

    return (<div>
        <h2>Phonebook</h2>
        <Notification message={notification} setMessage={setNotification}
                      notificationType={notificationType}></Notification>
        <Filter handleFilter={handleFilter}></Filter>
        <h3>Add a new</h3>
        <ContactForm props={{handleSubmit, newName, setNewName, newNumber, setNewNumber}}></ContactForm>
        <h2>Numbers</h2>
        <div>
            {filteredPeople.map((person) => (
                <Contact key={person.id} contact={person} deleteCallback={deleteCallback}/>))}
        </div>
    </div>)
}

export default App