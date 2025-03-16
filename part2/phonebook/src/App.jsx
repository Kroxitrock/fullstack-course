import {useState} from 'react'
import Contact from "./components/Contact.jsx";

const App = () => {
    const [persons, setPersons] = useState([{name: 'Arto Hellas'}])
    const [newName, setNewName] = useState('')

    function handleSubmit(e) {
        e.preventDefault();
        setPersons([...persons, {name: newName}])
    }

    return (<div>
        <h2>Phonebook</h2>
        <form onSubmit={e => handleSubmit(e)}>
            <div>
                name: <input onChange={e => setNewName(e.target.value)} value={newName}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        <h2>Numbers</h2>
        <div>
            {persons.map((person, index) => (<Contact key={index} contact={person}/>))}
        </div>
    </div>)
}

export default App